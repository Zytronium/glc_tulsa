import { client } from "@/../tina/__generated__/client";
import type { SignUpPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type SignUpData = NonNullable<SignUpPageQuery["signUpPage"]>;

export default async function SignUpPage() {
  const data = await client.queries.signUpPage({ relativePath: "sign-up.json" });

  return <ClientPage query={data} />;
}
