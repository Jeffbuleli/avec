import type {
  OfflineActionRecord,
  OfflineCacheRecord,
  OfflineFieldOpsState,
  OfflineMeetingDraft,
} from "@/lib/offline/types";

const DB_NAME = "eavec-offline";
const DB_VERSION = 1;
const ACTIONS_STORE = "actions";
const CACHE_STORE = "cache";
const DRAFTS_STORE = "drafts";
const META_STORE = "meta";

function supportsIndexedDb(): boolean {
  return typeof window !== "undefined" && "indexedDB" in window;
}

export async function openOfflineDb(): Promise<IDBDatabase | null> {
  if (!supportsIndexedDb()) return null;
  return await new Promise<IDBDatabase>((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(ACTIONS_STORE)) {
        const store = db.createObjectStore(ACTIONS_STORE, { keyPath: "id" });
        store.createIndex("by_status", "status", { unique: false });
        store.createIndex("by_scope", "scope", { unique: false });
        store.createIndex("by_createdAt", "createdAt", { unique: false });
      }
      if (!db.objectStoreNames.contains(CACHE_STORE)) {
        db.createObjectStore(CACHE_STORE, { keyPath: "key" });
      }
      if (!db.objectStoreNames.contains(DRAFTS_STORE)) {
        const store = db.createObjectStore(DRAFTS_STORE, { keyPath: "id" });
        store.createIndex("by_group", "groupId", { unique: false });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("indexeddb_open_failed"));
  }).catch(() => null);
}

function requestToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("indexeddb_request_failed"));
  });
}

export async function putAction(action: OfflineActionRecord): Promise<void> {
  const db = await openOfflineDb();
  if (!db) return;
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(ACTIONS_STORE, "readwrite");
    tx.objectStore(ACTIONS_STORE).put(action);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("put_action_failed"));
  }).catch(() => {});
}

export async function listActions(): Promise<OfflineActionRecord[]> {
  const db = await openOfflineDb();
  if (!db) return [];
  try {
    const tx = db.transaction(ACTIONS_STORE, "readonly");
    const rows = await requestToPromise(
      tx.objectStore(ACTIONS_STORE).getAll(),
    );
    return (rows as OfflineActionRecord[]).sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  } catch {
    return [];
  }
}

export async function listActionsByUser(userId: string): Promise<OfflineActionRecord[]> {
  const rows = await listActions();
  return rows.filter((row) => row.userId === userId);
}

export async function getAction(id: string): Promise<OfflineActionRecord | null> {
  const db = await openOfflineDb();
  if (!db) return null;
  try {
    const tx = db.transaction(ACTIONS_STORE, "readonly");
    const row = await requestToPromise(tx.objectStore(ACTIONS_STORE).get(id));
    return (row as OfflineActionRecord | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function deleteAction(id: string): Promise<void> {
  const db = await openOfflineDb();
  if (!db) return;
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(ACTIONS_STORE, "readwrite");
    tx.objectStore(ACTIONS_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("delete_action_failed"));
  }).catch(() => {});
}

export async function putCache<T>(record: OfflineCacheRecord<T>): Promise<void> {
  const db = await openOfflineDb();
  if (!db) return;
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(CACHE_STORE, "readwrite");
    tx.objectStore(CACHE_STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("put_cache_failed"));
  }).catch(() => {});
}

export async function getCache<T>(key: string): Promise<OfflineCacheRecord<T> | null> {
  const db = await openOfflineDb();
  if (!db) return null;
  try {
    const tx = db.transaction(CACHE_STORE, "readonly");
    const row = await requestToPromise(tx.objectStore(CACHE_STORE).get(key));
    return (row as OfflineCacheRecord<T> | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function putMeetingDraft(draft: OfflineMeetingDraft): Promise<void> {
  const db = await openOfflineDb();
  if (!db) return;
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(DRAFTS_STORE, "readwrite");
    tx.objectStore(DRAFTS_STORE).put(draft);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("put_draft_failed"));
  }).catch(() => {});
}

export async function listMeetingDrafts(groupId?: string): Promise<OfflineMeetingDraft[]> {
  const db = await openOfflineDb();
  if (!db) return [];
  try {
    const tx = db.transaction(DRAFTS_STORE, "readonly");
    const store = tx.objectStore(DRAFTS_STORE);
    const rows = groupId
      ? await requestToPromise(store.index("by_group").getAll(groupId))
      : await requestToPromise(store.getAll());
    return (rows as OfflineMeetingDraft[]).sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
  } catch {
    return [];
  }
}

export async function listMeetingDraftsByUser(
  userId: string,
  groupId?: string,
): Promise<OfflineMeetingDraft[]> {
  const rows = await listMeetingDrafts(groupId);
  return rows.filter((row) => row.userId === userId);
}

export async function putMeta<T>(key: string, value: T): Promise<void> {
  const db = await openOfflineDb();
  if (!db) return;
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(META_STORE, "readwrite");
    tx.objectStore(META_STORE).put({ key, value });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("put_meta_failed"));
  }).catch(() => {});
}

export async function getMeta<T>(key: string): Promise<T | null> {
  const db = await openOfflineDb();
  if (!db) return null;
  try {
    const tx = db.transaction(META_STORE, "readonly");
    const row = await requestToPromise(tx.objectStore(META_STORE).get(key));
    return ((row as { value?: T } | undefined)?.value as T | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function getFieldOpsState(): Promise<OfflineFieldOpsState> {
  return (
    (await getMeta<OfflineFieldOpsState>("field-ops")) ?? {
      primaryDeviceByGroup: {},
      facilitatorLabel: null,
    }
  );
}

export async function setFieldOpsState(value: OfflineFieldOpsState): Promise<void> {
  await putMeta("field-ops", value);
}

function fieldOpsKey(userId: string): string {
  return `field-ops:${userId}`;
}

export async function getFieldOpsStateForUser(
  userId: string,
): Promise<OfflineFieldOpsState> {
  return (
    (await getMeta<OfflineFieldOpsState>(fieldOpsKey(userId))) ?? {
      primaryDeviceByGroup: {},
      facilitatorLabel: null,
    }
  );
}

export async function setFieldOpsStateForUser(
  userId: string,
  value: OfflineFieldOpsState,
): Promise<void> {
  await putMeta(fieldOpsKey(userId), value);
}

export async function clearOfflineState(): Promise<void> {
  if (!supportsIndexedDb()) return;
  await new Promise<void>((resolve, reject) => {
    const req = window.indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error("indexeddb_delete_failed"));
    req.onblocked = () => reject(new Error("indexeddb_delete_blocked"));
  }).catch(() => {});
}
