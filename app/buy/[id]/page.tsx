import { getProduct } from '@/app/libs/actions';
import Image from 'next/image';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await getProduct(id);

  if (!product) {
    return <p>데이터 패칭 오류</p>;
  }

  return (
    <div className='flex flex-col justify-center min-w-[700px] px-40 py-20 gap-4 sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row'>
      <div className='w-full h-[500px] relative rounded-md overflow-hidden lg:flex-1 xl:flex-1 2xl:flex-1'>
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
      <div className='flex flex-col justify-between border rounded-md lg:flex-1 xl:flex-1 2xl:flex-1'>
        <div className='px-4 py-1 border-b'>
          <h4 className='text-lg font-semibold'>{product.title}</h4>
        </div>
        <div className='flex justify-center items-center h-60 lg:h-full lg:w-full xl:h-full 2xl:h-full'>
          <p className='text-sm'>{`"${product.description}"`}</p>
        </div>
        <div className='px-4 py-1 border-t'>
          <p className='text-sm'>
            조회수: <span className='text-blue-900'>{product.views}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
