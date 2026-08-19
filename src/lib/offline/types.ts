export type OfflineActionKind =
  | "group_contribution"
  | "fiat_deposit"
  | "fiat_withdraw";

export type OfflineActionStatus =
  | "queued"
  | "syncing"
  | "synced"
  | "failed"
  | "conflict";

export type OfflineActionRecord = {
  id: string;
  userId: string;
  kind: OfflineActionKind;
  createdAt: string;
  updatedAt: string;
  status: OfflineActionStatus;
  scope: string;
  payload: Record<string, unknown>;
  error?: string | null;
  result?: Record<string, unknown> | null;
};

export type OfflineCacheRecord<T = unknown> = {
  key: string;
  updatedAt: string;
  value: T;
};

export type OfflineMeetingDraft = {
  id: string;
  userId: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
  deviceLabel: string;
  attendees: string[];
  queuedContributionIds: string[];
  notes: string;
  receiptSummary: {
    shareValue: number;
    socialFundPerMeeting: number;
    totalQueuedAmount: number;
    queuedMembers: number;
  };
};

export type OfflineFieldOpsState = {
  primaryDeviceByGroup: Record<string, boolean>;
  facilitatorLabel: string | null;
};

export type OfflineSyncSnapshot = {
  online: boolean;
  userId: string | null;
  queueCount: number;
  syncing: boolean;
  lastSyncAt: string | null;
  failedCount: number;
};
