import Link from 'next/link';

import { getServerAuthSession } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (!!session?.user) {
    redirect('/home');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#42f554] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          SurePantry
        </h1>
        <h3>Import receipts, save more $$$, waste less food</h3>
        <div className="flex flex-col items-center gap-2">
          {/* <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p> */}

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? '/api/auth/signout' : '/api/auth/signin'}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
            >
              {session ? 'Sign out' : 'Sign in'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
