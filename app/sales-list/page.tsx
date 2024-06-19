import { usercheck } from '@/app/libs/actions';

export default async function Page() {
  await usercheck();

  return (
    <div className='flex h-[calc(100vh-64px)] flex-col items-center justify-between p-24'>
      판매 목록 페이지
    </div>
  );
}
