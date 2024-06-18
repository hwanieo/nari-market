import { nunito } from '@/app/ui/fonts';
import NavLinks from '@/app/ui/nav-links';
import clsx from 'clsx';
import Link from 'next/link';

export default function MainNav() {
  return (
    <header
      className={`${nunito.className} antialiased flex justify-between items-center px-40 py-4 shadow-sm sticky text-[#03045e] top-0 z-10`}
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
      <div className='flex gap-4 text-nowrap font-semibold'>
        <Link href='login' className='hover:text-[#480ca8] transition-all'>
          로그인
        </Link>
        <Link href='signup' className='hover:text-[#480ca8] transition-all'>
          회원가입
        </Link>
      </div>
    </header>
  );
}
