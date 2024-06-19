import { signup } from '@/app/libs/actions';

export default function Page() {
  return (
    <div className='w-96 border rounded px-6 py-10 mx-auto overflow-hidden hover:border-red-500'>
      <h1 className='text-center text-2xl font-bold mb-5'>회원가입</h1>
      <p className='text-center text-red-500 text-sm mb-10'>
        회원가입에 문제가 발생했습니다.
      </p>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label htmlFor='email' className='text-sm'>
            이메일
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            disabled
            className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8]'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password' className='text-sm'>
            비밀번호
          </label>
          <input
            type='password'
            id='password'
            name='password'
            required
            disabled
            className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8]'
          />
        </div>
        {/* <div className='flex flex-col'>
          <label id='password-check' className='text-sm'>
            비밀번호 확인
          </label>
          <input
            type='password'
            id='password-check'
            name='password-check'
            className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8]'
          />
        </div> */}
        <div>
          <button
            disabled
            formAction={signup}
            className='text-center border w-full mt-2 px-2 py-2 bg-[#03045e] hover:bg-[#480ca8] transition-all rounded-md text-white'
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
