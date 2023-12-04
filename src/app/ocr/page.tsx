import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function ReceiptUploadPage() {
  const session = await getServerAuthSession();
  if (session?.user) redirect("/api/auth/signin");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-"></div>
    </div>
  );
}
