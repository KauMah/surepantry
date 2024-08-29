import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';
import { CreatePost } from '../_components/create-post';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ImageUpload } from '../_components/image-upload';

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

  redirect('/api/auth/signin');
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <>
      <div className="m-2 w-full max-w-xs">
        <div className="flex flex-col items-center justify-center">
          {latestPost ? (
            <p className="truncate">Your most recent post: {latestPost.name}</p>
          ) : (
            <p>You have no posts yet.</p>
          )}
          <CreatePost />
          <Link
            href={'/api/auth/signout'}
            className="mx-auto rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/10   "
          >
            Sign Out
          </Link>
        </div>
      </div>
      <ImageUpload />
    </>
  );
}
