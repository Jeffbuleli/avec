/** e-AVEC public money — Francs congolais only. */
export const EAVEC_PRIMARY_CURRENCY = "Fc" as const;
export const EAVEC_SECONDARY_CURRENCY = "Fc" as const;

export function eavecDisplayAsset(asset: string): "Fc" {
  return "Fc";
}
