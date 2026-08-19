import { getMeta, putMeta } from "@/lib/offline/db";
import { getOfflineQueue, removeOfflineAction, updateOfflineAction } from "@/lib/offline/queue";
import type { OfflineActionRecord } from "@/lib/offline/types";

const LAST_SYNC_KEY = "offline-last-sync-at";

async function replayAction(row: OfflineActionRecord): Promise<{
  ok: boolean;
  status: number;
  body: Record<string, unknown> | null;
}> {
  switch (row.kind) {
    case "group_contribution": {
      const res = await fetch(`/api/groups/${row.scope}/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row.payload),
      });
      return {
        ok: res.ok,
        status: res.status,
        body: (await res.json().catch(() => null)) as Record<string, unknown> | null,
      };
    }
    case "fiat_deposit": {
      const res = await fetch("/api/wallet/fiat/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row.payload),
      });
      return {
        ok: res.ok,
        status: res.status,
        body: (await res.json().catch(() => null)) as Record<string, unknown> | null,
      };
    }
    case "fiat_withdraw": {
      const res = await fetch("/api/wallet/fiat/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row.payload),
      });
      return {
        ok: res.ok,
        status: res.status,
        body: (await res.json().catch(() => null)) as Record<string, unknown> | null,
      };
    }
  }
}

export async function syncOfflineQueue(userId?: string): Promise<{
  synced: number;
  failed: number;
}> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { synced: 0, failed: 0 };
  }
  const rows = await getOfflineQueue(userId);
  let synced = 0;
  let failed = 0;
  for (const row of rows) {
    if (row.status === "synced") continue;
    await updateOfflineAction(row.id, { status: "syncing", error: null });
    try {
      const result = await replayAction(row);
      if (result.ok) {
        synced += 1;
        await updateOfflineAction(row.id, {
          status: "synced",
          result: result.body,
          error: null,
        });
        await removeOfflineAction(row.id);
        continue;
      }
      failed += 1;
      const error =
        typeof result.body?.error === "string"
          ? result.body.error
          : typeof result.body?.message === "string"
            ? result.body.message
            : `http_${result.status}`;
      await updateOfflineAction(row.id, {
        status: result.status >= 409 ? "conflict" : "failed",
        error,
        result: result.body,
      });
    } catch (err) {
      failed += 1;
      await updateOfflineAction(row.id, {
        status: "failed",
        error: err instanceof Error ? err.message : "sync_failed",
      });
    }
  }
  await putMeta(userId ? `${LAST_SYNC_KEY}:${userId}` : LAST_SYNC_KEY, new Date().toISOString());
  return { synced, failed };
}

export async function readLastOfflineSyncAt(userId?: string): Promise<string | null> {
  return await getMeta<string>(userId ? `${LAST_SYNC_KEY}:${userId}` : LAST_SYNC_KEY);
}
