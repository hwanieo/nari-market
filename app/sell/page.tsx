import { usercheck } from '@/app/libs/actions';
import ImagePicker from '@/app/ui/sell/image-picker';
import { createClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  await usercheck();

  return (
    <div className='px-6 py-10 mx-auto overflow-hidden'>
      <h1 className='text-center text-xl font-semibold'>판매등록</h1>
      <div className='flex gap-10 mx-auto px-10 w-[70%]'>
        <ImagePicker />
        <form className='mt-10 flex-1 flex flex-col justify-between gap-4'>
          <div className='flex flex-col'>
            <label id='title' className='text-sm'>
              상품명
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8]'
            />
          </div>
          <div className='flex flex-col'>
            <label id='description' className='text-sm'>
              상품설명
            </label>
            <textarea
              id='description'
              name='description'
              className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8] resize-none w-full h-60'
            />
          </div>
          <div className='flex flex-col'>
            <label id='price' className='text-sm'>
              가격
            </label>
            <input
              type='number'
              id='price'
              name='price'
              className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8]'
            />
          </div>
          <div>
            <button
              type='submit'
              className='text-center border w-full mt-2 px-2 py-2 bg-[#03045e] hover:bg-[#480ca8] transition-all rounded-md text-white'
            >
              판매등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
