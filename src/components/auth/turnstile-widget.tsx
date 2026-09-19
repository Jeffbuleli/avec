"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
const LOAD_TIMEOUT_MS = 12_000;

let scriptPromise: Promise<void> | null = null;

function waitForTurnstileApi(timeoutMs: number): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const tick = () => {
      if (window.turnstile) {
        resolve();
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        reject(new Error("turnstile_api_timeout"));
        return;
      }
      window.setTimeout(tick, 50);
    };
    tick();
  });
}

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const finish = () => {
      void waitForTurnstileApi(LOAD_TIMEOUT_MS).then(resolve).catch(reject);
    };

    window.onTurnstileLoad = finish;

    const existing = document.querySelector(`script[src^="${TURNSTILE_SRC}"]`);
    if (existing) {
      finish();
      return;
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("turnstile_script_failed"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise.catch((err) => {
    scriptPromise = null;
    throw err;
  });
}

/** Start loading Turnstile early (e.g. on login mount) — do not await in render. */
export function preloadTurnstileScript(): void {
  void loadTurnstileScript();
}

export function TurnstileWidget({
  siteKey,
  onToken,
  onExpire,
  onFailed,
  className,
}: {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onFailed?: () => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const onFailedRef = useRef(onFailed);
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  onTokenRef.current = onToken;
  onExpireRef.current = onExpire;
  onFailedRef.current = onFailed;

  useEffect(() => {
    let cancelled = false;
    setFailed(false);

    const failTimer = window.setTimeout(() => {
      if (!cancelled && !widgetIdRef.current) {
        setFailed(true);
        onFailedRef.current?.();
      }
    }, LOAD_TIMEOUT_MS);

    void loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) {
          throw new Error("turnstile_unavailable");
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          appearance: "always",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onExpireRef.current?.(),
          "error-callback": () => {
            if (!cancelled) {
              setFailed(true);
              onFailedRef.current?.();
            }
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          onFailedRef.current?.();
        }
      });

    return () => {
      cancelled = true;
      window.clearTimeout(failTimer);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, retryKey]);

  if (failed) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3 text-center">
        <p className="text-xs font-semibold text-amber-900">
          Captcha unavailable. Check your connection, then retry.
        </p>
        <button
          type="button"
          className="mt-2 text-xs font-bold text-[#0F2D2F] underline"
          onClick={() => {
            setFailed(false);
            setRetryKey((k) => k + 1);
          }}
        >
          Retry captcha
        </button>
      </div>
    );
  }

  return (
    <div
      key={retryKey}
      className={`flex min-h-[65px] items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--fd-border)] bg-white/90 p-2 shadow-sm [&_iframe]:rounded-xl ${className ?? ""}`}
      aria-busy="true"
    >
      <div ref={containerRef} className="flex w-full justify-center" />
    </div>
  );
}
