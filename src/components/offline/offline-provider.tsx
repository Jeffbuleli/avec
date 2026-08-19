"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFieldOpsState, setFieldOpsState } from "@/lib/offline/db";
import { getOfflineQueue } from "@/lib/offline/queue";
import { readLastOfflineSyncAt, syncOfflineQueue } from "@/lib/offline/sync";
import type {
  OfflineActionRecord,
  OfflineFieldOpsState,
  OfflineSyncSnapshot,
} from "@/lib/offline/types";

type OfflineContextValue = OfflineSyncSnapshot & {
  queue: OfflineActionRecord[];
  refresh: () => Promise<void>;
  syncNow: () => Promise<void>;
  fieldOps: OfflineFieldOpsState;
  setPrimaryDevice: (groupId: string, value: boolean) => Promise<void>;
};

const OfflineContext = createContext<OfflineContextValue | null>(null);

export function OfflineProvider({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [queue, setQueue] = useState<OfflineActionRecord[]>([]);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null);
  const [fieldOps, setFieldOps] = useState<OfflineFieldOpsState>({
    primaryDeviceByGroup: {},
    facilitatorLabel: null,
  });

  const refresh = useCallback(async () => {
    const [rows, lastSync, fieldState] = await Promise.all([
      getOfflineQueue(),
      readLastOfflineSyncAt(),
      getFieldOpsState(),
    ]);
    setQueue(rows);
    setLastSyncAt(lastSync);
    setFieldOps(fieldState);
    return;
  }, []);

  const syncNow = useCallback(async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      await syncOfflineQueue();
      await refresh();
    } finally {
      setSyncing(false);
    }
  }, [refresh, syncing]);

  useEffect(() => {
    setOnline(typeof navigator === "undefined" ? true : navigator.onLine);
    void refresh();
    const up = () => {
      setOnline(true);
      void syncNow();
    };
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    const timer = window.setInterval(() => {
      void refresh();
      if (navigator.onLine) void syncNow();
    }, 15000);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
      window.clearInterval(timer);
    };
  }, [refresh, syncNow]);

  const setPrimaryDevice = useCallback(
    async (groupId: string, value: boolean) => {
      const next: OfflineFieldOpsState = {
        ...fieldOps,
        primaryDeviceByGroup: {
          ...fieldOps.primaryDeviceByGroup,
          [groupId]: value,
        },
      };
      setFieldOps(next);
      await setFieldOpsState(next);
    },
    [fieldOps],
  );

  const value = useMemo<OfflineContextValue>(() => {
    const failedCount = queue.filter(
      (x) => x.status === "failed" || x.status === "conflict",
    ).length;
    return {
      online,
      queueCount: queue.length,
      syncing,
      queue,
      lastSyncAt,
      failedCount,
      refresh,
      syncNow,
      fieldOps,
      setPrimaryDevice,
    };
  }, [fieldOps, lastSyncAt, online, queue, refresh, setPrimaryDevice, syncing, syncNow]);

  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
}

export function useOfflineState() {
  const value = useContext(OfflineContext);
  if (!value) {
    throw new Error("useOfflineState must be used inside OfflineProvider");
  }
  return value;
}
