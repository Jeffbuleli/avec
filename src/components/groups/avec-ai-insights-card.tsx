"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";

type Insight = {
  id: string;
  textEn: string;
  textFr: string;
};

/** Plain tips for the group — no internal source / mode jargon. */
export function AvecAiInsightsCard({ groupId }: { groupId: string }) {
  const { t, locale } = useI18n();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [err, setErr] = useState(false);

  const load = useCallback(async () => {
    setErr(false);
    try {
      const res = await fetch(
        `/api/groups/${groupId}/insights?locale=${locale === "fr" ? "fr" : "en"}`,
        { cache: "no-store" },
      );
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(true);
        return;
      }
      setInsights(((j as { insights?: Insight[] }).insights ?? []).slice(0, 3));
    } catch {
      setErr(true);
    }
  }, [groupId, locale]);

  useEffect(() => {
    void load();
  }, [load]);

  if (err) {
    return (
      <p className="text-xs text-[color:var(--fd-muted)]">
        {t("avec_ai_insights_error")}
      </p>
    );
  }

  if (insights.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[color:var(--fd-border)] bg-[color:var(--fd-card)] p-3">
      <h3 className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--fd-muted)]">
        {t("avec_ai_insights_title")}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {insights.map((ins) => (
          <li
            key={ins.id}
            className="rounded-xl bg-[color:var(--fd-bg)] px-2.5 py-2 text-xs leading-snug text-[color:var(--fd-text)]"
          >
            {locale === "fr" ? ins.textFr : ins.textEn}
          </li>
        ))}
      </ul>
    </section>
  );
}
