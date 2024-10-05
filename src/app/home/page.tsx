import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';
import { CreatePost } from '../_components/create-post';
import { redirect } from 'next/navigation';
import { Navbar } from '../_components/navbar';

export default async function AppHome() {
  const session = await getServerAuthSession();
  if (!!session)
    return (
      <>
        <Navbar />
        <div className="flex h-screen items-center justify-center">
          <CrudShowcase />
        </div>
      </>
    );

  redirect('/api/auth/signin');
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  return null;
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <>
      <div className="m-2 w-full max-w-xs">
        <div className="flex flex-col items-center justify-center">
          {latestPost ? (
            // <p className="truncate">Your most recent post: {latestPost.name}</p>
          ) : (
            <p>You have no posts yet.</p>
          )}
          <CreatePost />
        </div>
      </div>
    </>
  );
}
