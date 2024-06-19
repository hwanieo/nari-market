'use client';

import Image from 'next/legacy/image';
import { ChangeEvent, useRef, useState } from 'react';

export default function ImagePicker() {
  const [imageSrc, setImageSrc] = useState<string | undefined>('');
  const imageBoxRef = useRef<HTMLInputElement>(null);

  function handlePickImage() {
    imageBoxRef.current?.click();
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!reader.result) {
          return;
        }
        setImageSrc(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className='flex-1 flex flex-col'>
      <label className='text-sm'>이미지</label>
      <div
        onClick={handlePickImage}
        className='w-52 h-52 border rounded-md cursor-pointer relative'
      >
        {imageSrc ? (
          <Image src={imageSrc} layout='fill' objectFit='cover' alt='이미지' />
        ) : (
          <span className='flex items-center justify-center h-full text-gray-500'>
            이미지를 선택하세요
          </span>
        )}
      </div>
      <input
        type='file'
        id='image'
        name='image'
        accept='image/*'
        ref={imageBoxRef}
        onChange={handleImageChange}
        className='border rounded-sm px-2 py-1 outline-none focus:border-[#480ca8] w-full'
        required
        hidden
      />
    </div>
  );
}
