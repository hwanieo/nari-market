export default function Page() {
  return (
    <div className='w-96 border rounded px-6 py-10 mx-auto'>
      <h1 className='text-center text-2xl font-bold mb-10'>로그인</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label id='email' className='text-sm'>
            이메일
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8]'
          />
        </div>
        <div className='flex flex-col'>
          <label id='password' className='text-sm'>
            비밀번호
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8]'
          />
        </div>
        <div>
          <button
            type='submit'
            className='text-center border w-full mt-2 px-2 py-2 bg-[#03045e] hover:bg-[#480ca8] transition-all rounded-md text-white'
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
