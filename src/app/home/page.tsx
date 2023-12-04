import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { CreatePost } from "../_components/create-post";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppHome() {
  const session = await getServerAuthSession();
  if (session)
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          <CrudShowcase />
        </div>
      </>
    );

  redirect("/api/auth/signin");
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
      <Link
        href={"/api/auth/signout"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Sign Out
      </Link>
    </div>
  );
}
