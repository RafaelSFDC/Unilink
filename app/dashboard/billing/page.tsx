import { checkSubscription } from "@/lib/subscription";
import BillingPageClient from "@/components/billing-page";

export default async function BillingPage() {
  const isPro = await checkSubscription();

  return <BillingPageClient isPro={isPro} />;
}
