import { getSalesList, usercheck } from '@/app/libs/actions';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
  await usercheck();

  const products = await getSalesList();

  return (
    <div className='flex h-[calc(100vh-64px)]flex-col items-center justify-between py-24'>
      <ul className='grid grid-cols-1 gap-4 mx-auto px-40 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/buy/${product.id}`}>
              <div className='flex flex-col items-center gap-4 relative'>
                <div className='w-52 h-52 relative rounded-md overflow-hidden'>
                  {!product.imageUrl && <p>이미지 에러</p>}
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      fill
                      alt={product.title}
                      className='object-cover'
                    />
                  )}
                </div>
                <div className='flex justify-between w-full items-center rounded-md px-2'>
                  <h4 className='font-bold'>{product.title}</h4>
                  <span className='text-sm font-semibold'>
                    {`${product.price.toLocaleString()}`}원
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
