import Link from 'next/link';
import SignOutButton from '@/app/ui/signout-button';
import { createClient } from '@/app/utils/supabase/server';

export default async function AuthAction() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  let authButton = <SignOutButton />;

  if (error || !data.user) {
    authButton = (
      <>
        <Link href='login' className='hover:text-[#480ca8] transition-all'>
          로그인
        </Link>
        <Link href='signup' className='hover:text-[#480ca8] transition-all'>
          회원가입
        </Link>
      </>
    );
  }
  return (
    <div className='flex gap-4 text-nowrap font-semibold'>{authButton}</div>
  );
}
