import { deleteAction, listActions, putAction } from "@/lib/offline/db";
import type {
  OfflineActionKind,
  OfflineActionRecord,
  OfflineActionStatus,
} from "@/lib/offline/types";

function actionId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.randomUUID) return cryptoApi.randomUUID();
  return `offline_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function enqueueOfflineAction(args: {
  kind: OfflineActionKind;
  scope: string;
  payload: Record<string, unknown>;
}): Promise<OfflineActionRecord> {
  const now = new Date().toISOString();
  const record: OfflineActionRecord = {
    id: actionId(),
    kind: args.kind,
    scope: args.scope,
    payload: args.payload,
    createdAt: now,
    updatedAt: now,
    status: "queued",
    error: null,
    result: null,
  };
  await putAction(record);
  return record;
}

export async function getOfflineQueue(): Promise<OfflineActionRecord[]> {
  return await listActions();
}

export async function updateOfflineAction(
  id: string,
  patch: Partial<OfflineActionRecord>,
): Promise<OfflineActionRecord | null> {
  const all = await listActions();
  const current = all.find((x) => x.id === id);
  if (!current) return null;
  const next: OfflineActionRecord = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await putAction(next);
  return next;
}

export async function removeOfflineAction(id: string): Promise<void> {
  await deleteAction(id);
}

export async function queueSnapshot(): Promise<{
  count: number;
  failedCount: number;
  queuedCount: number;
}> {
  const rows = await listActions();
  return {
    count: rows.length,
    failedCount: rows.filter((r) => r.status === "failed" || r.status === "conflict")
      .length,
    queuedCount: rows.filter((r) => r.status === "queued" || r.status === "syncing").length,
  };
}

export function queueLabel(status: OfflineActionStatus): string {
  switch (status) {
    case "queued":
      return "queued";
    case "syncing":
      return "syncing";
    case "synced":
      return "synced";
    case "failed":
      return "failed";
    case "conflict":
      return "conflict";
  }
}
