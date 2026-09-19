"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { AvecListMark } from "@/components/groups/avec-icons";
import { GroupStatusBadge } from "@/components/groups/group-status-badge";
import {
  AvecDiscoverSheet,
  type DiscoverGroup,
} from "@/components/groups/avec-discover-sheet";
import { avecCls } from "@/components/groups/avec-ui";
import { WalletSubpageHeader } from "@/components/wallet/wallet-subpage-header";
import { ListPagination, useListPagination } from "@/components/ui/list-pagination";
import { clientErrorText } from "@/lib/client-error-text";
import { groupRoleLabel } from "@/lib/group-role-label";
import { countryShortLabel } from "@/lib/country-label";
import { McBuleliPoweredFooter } from "@/components/brand/mcbuleli-powered-footer";
import { AvecHelpSheet, AvecHelpTrigger } from "@/components/groups/avec-help-sheet";

type Row = {
  groupId: string;
  name: string;
  type: string;
  status: string;
  subscriptionStatus: string;
  nextBillingAt: string | null;
  role: string;
  membershipStatus: string;
  createdAt: string;
  logoUrl?: string | null;
  countryCode?: string | null;
  maxMembers?: number;
  memberCount?: number;
  isCreator?: boolean;
};

function HubTileAvatar({
  name,
  logoUrl,
}: {
  name: string;
  logoUrl?: string | null;
}) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logoUrl} alt="" className="h-full w-full object-cover" />
    );
  }
  return (
    <span className="text-2xl font-black tracking-tight text-[color:var(--fd-primary)]">
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function AvecHubPage() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [discover, setDiscover] = useState<DiscoverGroup[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [sheetGroup, setSheetGroup] = useState<DiscoverGroup | null>(null);

  useEffect(() => {
    setErr(null);
    void (async () => {
      const [mineRes, discRes] = await Promise.all([
        fetch("/api/groups/mine", { cache: "no-store" }),
        fetch("/api/groups/discover", { cache: "no-store" }),
      ]);
      const mineData = await mineRes.json().catch(() => ({}));
      if (!mineRes.ok) {
        setErr(mineData.error ?? "group_dashboard_failed");
        setRows([]);
      } else {
        const all = (mineData.groups ?? []) as Row[];
        setRows(
          all.filter((r) => r.type === "avec" || r.type === "likelimba"),
        );
      }
      const discData = await discRes.json().catch(() => ({}));
      if (discRes.ok) {
        setDiscover((discData.groups ?? []) as DiscoverGroup[]);
      } else {
        setDiscover([]);
      }
    })();
  }, []);

  const minePag = useListPagination(rows ?? [], 9);
  const discoverPag = useListPagination(discover ?? [], 9);

  const mineSlice = useMemo(() => minePag.slice, [minePag.slice]);

  return (
    <div className="mx-auto w-full max-w-lg space-y-5 pb-8 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      <WalletSubpageHeader
        title={t("group_hub_title")}
        subtitle={t("group_hub_sub")}
        backHref="/app/home"
        badge={<AvecHelpTrigger onClick={() => setHelpOpen(true)} />}
        action={
          <Link
            href="/app/wallet/groups/new"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--fd-primary)] text-lg font-bold text-white shadow-md active:scale-95"
            aria-label={t("group_hub_create")}
          >
            +
          </Link>
        }
      />

      {err ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {clientErrorText(t, err)}
        </p>
      ) : null}

      <Link
        href="/app/facilitateur"
        className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--fd-primary)]/15 bg-[#0F2D2F] px-4 py-3.5 text-[#F6E8CD] shadow-md shadow-[color:var(--fd-primary)]/20"
      >
        <div className="min-w-0">
          <p className="text-sm font-extrabold">
            {locale === "fr" ? "Facilitateur ONG" : "NGO facilitator"}
          </p>
          <p className="text-[11px] text-[#F6E8CD]/75">
            {locale === "fr"
              ? "Multi-groupes · alertes · export PV"
              : "Multi-group · alerts · minutes export"}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#C9A227] px-3 py-1.5 text-[10px] font-bold text-[#0F2D2F]">
          {locale === "fr" ? "Ouvrir" : "Open"}
        </span>
      </Link>

      <section className="space-y-2.5">
        <div className="flex items-end justify-between gap-2">
          <h2 className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--fd-muted)]">
            {t("group_hub_mine_title")}
          </h2>
          {rows && rows.length > 0 ? (
            <span className="text-[10px] font-bold tabular-nums text-[color:var(--fd-primary)]">
              {rows.length}
            </span>
          ) : null}
        </div>

        {rows === null ? (
          <p className="text-[color:var(--fd-muted)]">…</p>
        ) : rows.length === 0 ? (
          <div className="fd-card flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[color:var(--fd-primary)]/25 bg-gradient-to-b from-[color:var(--fd-mint)]/40 to-[color:var(--fd-card)] p-8 text-center">
            <AvecListMark className="h-14 w-14 text-[color:var(--fd-primary)]" />
            <p className="text-sm font-bold text-[color:var(--fd-text)]">{t("group_hub_empty")}</p>
            <p className="max-w-xs text-[11px] leading-relaxed text-[color:var(--fd-muted)]">
              {t("group_hub_empty_hint")}
            </p>
            <Link
              href="/app/wallet/groups/new"
              className="mt-1 rounded-full bg-[color:var(--fd-primary)] px-4 py-2 text-sm font-bold text-white shadow-sm"
            >
              {t("group_hub_create")}
            </Link>
          </div>
        ) : (
          <>
            <ul className={avecCls.hubMosaic}>
              {mineSlice.map((r) => {
                const region = r.countryCode
                  ? countryShortLabel(locale, r.countryCode)
                  : "";
                const actionLabel =
                  r.membershipStatus === "pending"
                    ? t("group_hub_action_pending")
                    : r.status === "active"
                      ? t("group_hub_action_open")
                      : t("group_hub_action_review");
                const membersLabel =
                  r.maxMembers != null && r.memberCount != null
                    ? `${r.memberCount}/${r.maxMembers}`
                    : null;

                return (
                  <li key={r.groupId}>
                    <Link
                      href={`/app/wallet/groups/${r.groupId}`}
                      className={avecCls.hubTile}
                    >
                      <div className={avecCls.hubTileHead}>
                        <HubTileAvatar name={r.name} logoUrl={r.logoUrl} />
                        <span className="absolute right-2 top-2">
                          <GroupStatusBadge status={r.status} />
                        </span>
                      </div>
                      <div className={avecCls.hubTileBody}>
                        <p className="line-clamp-2 text-[13px] font-extrabold leading-snug tracking-tight text-[color:var(--fd-text)]">
                          {r.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-1">
                          <span className={avecCls.hubChip}>
                            {groupRoleLabel(t, r.role)}
                          </span>
                          {membersLabel ? (
                            <span className="text-[9px] font-bold tabular-nums text-[color:var(--fd-muted)]">
                              {membersLabel}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-1 pt-1">
                          <span className="truncate text-[10px] font-bold text-[color:var(--fd-primary)]">
                            {actionLabel}
                          </span>
                          {region ? (
                            <span className="truncate text-[9px] font-semibold text-[color:var(--fd-muted)]">
                              {region}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ListPagination
              page={minePag.page}
              pageSize={minePag.pageSize}
              totalPages={minePag.totalPages}
              total={minePag.total}
              onPageChange={minePag.setPage}
              onPageSizeChange={minePag.setPageSize}
            />
          </>
        )}
      </section>

      <section className="space-y-2.5 border-t border-[color:var(--fd-border)] pt-5">
        <h2 className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--fd-muted)]">
          {t("group_discover_title")}
        </h2>
        <p className="text-[11px] leading-snug text-[color:var(--fd-muted)]">
          {t("group_discover_sub")}
        </p>

        {discover === null ? (
          <p className="text-[color:var(--fd-muted)]">…</p>
        ) : discover.length === 0 ? (
          <p className="fd-card rounded-2xl px-3 py-5 text-center text-xs text-[color:var(--fd-muted)]">
            {t("group_discover_empty")}
          </p>
        ) : (
          <>
            <ul className={avecCls.hubMosaic}>
              {discoverPag.slice.map((g) => {
                const region = g.countryCode
                  ? countryShortLabel(locale, g.countryCode)
                  : t("group_discover_location_fallback");
                const membersLabel =
                  g.memberCount != null
                    ? `${g.memberCount}/${g.maxMembers}`
                    : null;

                return (
                  <li key={g.groupId}>
                    <button
                      type="button"
                      onClick={() => setSheetGroup(g)}
                      className={`${avecCls.hubTile} w-full`}
                    >
                      <div className={avecCls.hubTileHead}>
                        <HubTileAvatar name={g.name} logoUrl={g.logoUrl} />
                      </div>
                      <div className={avecCls.hubTileBody}>
                        <p className="line-clamp-2 text-[13px] font-extrabold leading-snug tracking-tight text-[color:var(--fd-text)]">
                          {g.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-[10px] font-semibold text-[color:var(--fd-muted)]">
                            {region}
                          </span>
                          {membersLabel ? (
                            <span className={avecCls.hubChip}>{membersLabel}</span>
                          ) : null}
                        </div>
                        <span className="mt-auto inline-flex w-fit rounded-full bg-[color:var(--fd-primary)] px-3 py-1.5 text-[10px] font-bold text-white">
                          {t("group_discover_cta")}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
            <ListPagination
              page={discoverPag.page}
              pageSize={discoverPag.pageSize}
              totalPages={discoverPag.totalPages}
              total={discoverPag.total}
              onPageChange={discoverPag.setPage}
              onPageSizeChange={discoverPag.setPageSize}
            />
          </>
        )}
      </section>

      <McBuleliPoweredFooter />
      <AvecHelpSheet open={helpOpen} onClose={() => setHelpOpen(false)} />
      {sheetGroup ? (
        <AvecDiscoverSheet
          group={sheetGroup}
          onClose={() => setSheetGroup(null)}
          onJoined={(gid) => router.push(`/app/wallet/groups/${gid}`)}
        />
      ) : null}
    </div>
  );
}
