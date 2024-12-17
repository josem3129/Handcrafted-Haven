import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { playfair } from '@/app/ui/fonts';
import Image from 'next/image';
import SideNav from './ui/dashboard/sidenav';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 border-2 max-w-56 max-h-max">
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block  "></div>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
      </div>
    </div>
     
    </main>
  );
}
