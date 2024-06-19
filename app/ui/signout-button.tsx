'use client';

import { signout } from '@/app/libs/actions';

async function handleSignOut() {
  signout();
}

export default function SignOutButton() {
  return (
    <button
      onClick={handleSignOut}
      className='hover:text-[#480ca8] transition-all'
    >
      로그아웃
    </button>
  );
}
