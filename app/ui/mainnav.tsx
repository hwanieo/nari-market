import AuthAction from '@/app/ui/auth-action';
import { nunito } from '@/app/ui/fonts';
import NavLinks from '@/app/ui/nav-links';
import Link from 'next/link';

export default async function MainNav() {
  return (
    <header
      className={`${nunito.className} antialiased flex justify-between items-center px-40 py-4 shadow-sm sticky text-[#03045e] top-0 z-10 bg-white`}
    >
      <div className='flex items-center gap-10 text-nowrap'>
        <Link
          href='/'
          className='text-2xl uppercase font-semiboldtransition-all'
        >
          Nari
        </Link>
        <NavLinks />
      </div>
      <AuthAction />
    </header>
  );
}
