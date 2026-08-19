export const OFFLINE_POLICY = {
  maxQueuedActions: 50,
  maxGroupContributionUsd: 500,
  maxFiatRequestUsd: 250,
  maxOfflineAgeHours: 72,
} as const;

export function canQueueGroupContribution(totalUsd: number): boolean {
  return Number.isFinite(totalUsd) && totalUsd > 0 && totalUsd <= OFFLINE_POLICY.maxGroupContributionUsd;
}

export function canQueueFiatRequest(totalUsd: number): boolean {
  return Number.isFinite(totalUsd) && totalUsd > 0 && totalUsd <= OFFLINE_POLICY.maxFiatRequestUsd;
}
