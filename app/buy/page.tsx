import CardWrapper from '@/app/ui/buy/cards';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className='flex flex-col items-start py-20'>
      <Suspense fallback={<p>Loading...</p>}>
        <CardWrapper />
      </Suspense>
    </div>
  );
}
