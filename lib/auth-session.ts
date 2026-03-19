import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getAuthSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuthSession() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}
