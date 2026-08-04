import type { Metadata } from "next";
import { PasswordGate } from "@/components/pages/PasswordGate";

export const metadata: Metadata = {
  title: "Deposits | Grace Evangelical Lutheran Church",
  robots: { index: false, follow: false },
};

export default function GlcDepositsPage() {
  return <PasswordGate slug="glcdeposits" />;
}
