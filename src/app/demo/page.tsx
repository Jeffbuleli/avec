"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LangSwitch } from "@/components/lang-switch";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { useI18n } from "@/components/i18n-provider";

type DemoPayload = {
  ok: boolean;
  seeded: boolean;
  groupId?: string;
  groupName?: string;
  inviteCode?: string;
  adminEmail?: string;
  passwordHint?: string;
  openVote?: { title: string; status: string } | null;
  passport?: { partnerLabel: string; scopes: string } | null;
  steps?: {
    t: string;
    labelFr: string;
    labelEn: string;
    path: string;
  }[];
  loginAdminPath?: string;
  message?: string;
};

export default function DemoPage() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [data, setData] = useState<DemoPayload | null>(null);

  useEffect(() => {
    void fetch("/api/demo/umoja", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: DemoPayload) => setData(j))
      .catch(() =>
        setData({ ok: false, seeded: false, message: "network" }),
      );
  }, []);

  return (
    <div className="min-h-dvh bg-[#0F2D2F] text-[#F6E8CD]">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/brand/logo-wordmark-dark.png"
            alt="e-AVEC"
            width={140}
            height={36}
            className="h-9 w-auto"
            unoptimized
          />
        </Link>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link
            href="/"
            className="rounded-full border border-[#F6E8CD]/30 px-3 py-1.5 text-xs font-semibold"
          >
            {fr ? "Accueil" : "Home"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-20">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
          VUK’AFRIK · Jury
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
          {fr ? "Démo 90 secondes — AVEC Umoja" : "90-second demo — AVEC Umoja"}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F6E8CD]/80">
          {fr
            ? "Parcours scripté pour le hackathon : problème AVEC (caisse opaque) → solution e-AVEC (transparence, vote, Passport)."
            : "Scripted hackathon walkthrough: AVEC problem (opaque cash box) → e-AVEC solution (transparency, vote, Passport)."}
        </p>

        <section className="mt-8 rounded-2xl border border-[#F6E8CD]/15 bg-[#0a2224] p-5">
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#C9A227]">
            {fr ? "Connexion jury" : "Jury login"}
          </h2>
          {!data ? (
            <p className="mt-3 text-sm text-[#F6E8CD]/70">…</p>
          ) : !data.seeded ? (
            <p className="mt-3 text-sm text-amber-200">
              {fr
                ? "Sandbox pas encore seedée. Sur le serveur : npm run seed:eavec-umoja"
                : "Sandbox not seeded yet. On server: npm run seed:eavec-umoja"}
            </p>
          ) : (
            <div className="mt-3 space-y-2 text-sm">
              <p>
                <span className="text-[#F6E8CD]/55">{fr ? "Email" : "Email"} · </span>
                <code className="rounded bg-black/30 px-1.5 py-0.5">{data.adminEmail}</code>
              </p>
              <p>
                <span className="text-[#F6E8CD]/55">{fr ? "Mot de passe" : "Password"} · </span>
                <code className="rounded bg-black/30 px-1.5 py-0.5">{data.passwordHint}</code>
              </p>
              <p>
                <span className="text-[#F6E8CD]/55">{fr ? "Groupe" : "Group"} · </span>
                {data.groupName}{" "}
                <span className="text-[#F6E8CD]/45">({data.inviteCode})</span>
              </p>
              {data.openVote ? (
                <p className="text-[#F6E8CD]/75">
                  {fr ? "Vote ouvert :" : "Open vote:"} {data.openVote.title}
                </p>
              ) : null}
              {data.passport ? (
                <p className="text-[#F6E8CD]/75">
                  Passport → {data.passport.partnerLabel}
                </p>
              ) : null}
              {data.loginAdminPath ? (
                <Link
                  href={data.loginAdminPath}
                  className="mt-4 inline-flex min-h-[48px] items-center rounded-full bg-[#F6E8CD] px-5 text-sm font-extrabold text-[#0F2D2F]"
                >
                  {fr ? "Ouvrir la démo (admin)" : "Open demo (admin)"}
                </Link>
              ) : null}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#C9A227]">
            {fr ? "Script 90 s" : "90s script"}
          </h2>
          <ol className="mt-4 space-y-3">
            {(data?.steps ?? []).map((step) => (
              <li
                key={step.t}
                className="flex flex-col gap-2 rounded-2xl border border-[#F6E8CD]/12 bg-[linear-gradient(180deg,rgba(246,232,205,0.1),rgba(246,232,205,0.03))] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#C9A227]">{step.t}</p>
                  <p className="mt-1 text-sm font-semibold">
                    {fr ? step.labelFr : step.labelEn}
                  </p>
                </div>
                <Link
                  href={
                    data?.loginAdminPath
                      ? `/login?email=${encodeURIComponent(data.adminEmail ?? "")}&next=${encodeURIComponent(step.path)}`
                      : step.path
                  }
                  className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full border border-[#F6E8CD]/35 px-4 text-xs font-bold"
                >
                  {fr ? "Aller" : "Go"}
                </Link>
              </li>
            ))}
            {!data?.steps?.length ? (
              <li className="text-sm text-[#F6E8CD]/55">
                {fr
                  ? "1 Vue → 2 Réunion → 3 Caisse → 4 Passport"
                  : "1 Overview → 2 Meeting → 3 Treasury → 4 Passport"}
              </li>
            ) : null}
          </ol>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-[#F6E8CD]/45">
          {fr
            ? "e-AVEC n’est pas une banque et ne revendique aucun agrément BCC. Données sandbox Umoja uniquement."
            : "e-AVEC is not a bank and claims no BCC license. Umoja sandbox data only."}
        </p>
      </main>

      <McBuleliPoweredFooter className="border-[#F6E8CD]/10 [&_span]:text-[#F6E8CD]/55 [&_a]:text-[#C9A227]" />
    </div>
  );
}
