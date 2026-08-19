/** User-facing currency labels for e-AVEC (USD/CDF; ledger may use USDT columns internally). */
export const EAVEC_PRIMARY_CURRENCY = "USD" as const;
export const EAVEC_SECONDARY_CURRENCY = "CDF" as const;

export function eavecDisplayAsset(asset: string): string {
  if (asset === "USDT") return EAVEC_PRIMARY_CURRENCY;
  return asset;
}

export function formatEavecAmount(
  amount: string | number,
  currency: string = EAVEC_PRIMARY_CURRENCY,
): string {
  return `${amount} ${currency}`;
}

/** Legacy copy that still says USDT in code — show USD to users. */
export function eavecMoneyLabel(amount: string | number): string {
  return formatEavecAmount(amount, EAVEC_PRIMARY_CURRENCY);
}
