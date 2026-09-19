import { redirect } from "next/navigation";

/** Fiat hub removed - e-AVEC uses Fc (CDF) only via Wallet. */
export default function WalletFiatHubPage() {
  redirect("/app/wallet");
}
