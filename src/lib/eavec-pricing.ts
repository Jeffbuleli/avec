/**
 * e-AVEC public pricing (RDC · Fc) — jury BM + product constants.
 * Transfers internent = gratuit (croissance / viralité).
 */

/** Abonnement mensuel par groupe AVEC. */
export const AVEC_SUBSCRIPTION_FEE_CDF = 1_000;

/** Licence mensuelle ONG / facilitateur (portefeuille multi-groupes). */
export const ONG_FACILITATOR_FEE_CDF = 10_000;

/** Dépôt / retrait Mobile Money (plateforme). */
export const FIAT_DEPOSIT_WITHDRAW_FEE_RATE = 0.035;

/** Commission Marché facturée à l’acheteur sur chaque transaction. */
export const MARKET_BUYER_FEE_RATE = 0.01;

/** Transfert interne wallet → wallet e-AVEC. */
export const INTERNAL_TRANSFER_FEE_CDF = 0;

export function marketBuyerFeeCdf(totalCdf: number): number {
  if (!Number.isFinite(totalCdf) || totalCdf <= 0) return 0;
  return Math.round(totalCdf * MARKET_BUYER_FEE_RATE);
}

export function marketBuyerChargeCdf(totalCdf: number): number {
  return Math.round(totalCdf + marketBuyerFeeCdf(totalCdf));
}
