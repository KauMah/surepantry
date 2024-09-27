import { redirect } from 'next/navigation';
import { getServerAuthSession } from '~/server/auth';
import { ImageUpload } from '../_components/image-upload';
import { Navbar } from '../_components/navbar';

export default async function ReceiptUploadPage() {
  const session = await getServerAuthSession();
  if (!session || !session?.user) redirect('/api/auth/signin');

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <ImageUpload />
        </div>
      </div>
    </>
  );
}
