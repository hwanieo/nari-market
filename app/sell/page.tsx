import { usercheck } from '@/app/libs/actions';
import RegisterForm from '@/app/ui/sell/register-form';

export default async function Page() {
  await usercheck();

  return (
    <div className='px-6 py-10 mx-auto overflow-hidden'>
      <h1 className='text-center text-xl font-semibold'>상품등록</h1>
      <div className='mx-auto px-10 w-[50%]'>
        <RegisterForm />
      </div>
    </div>
  );
}
