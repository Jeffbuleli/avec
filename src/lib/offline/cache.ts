import { getCache, putCache } from "@/lib/offline/db";

export async function writeOfflineCache<T>(key: string, value: T): Promise<void> {
  await putCache({
    key,
    updatedAt: new Date().toISOString(),
    value,
  });
}

export async function readOfflineCache<T>(key: string): Promise<{
  value: T;
  updatedAt: string;
} | null> {
  const row = await getCache<T>(key);
  if (!row) return null;
  return { value: row.value, updatedAt: row.updatedAt };
}
