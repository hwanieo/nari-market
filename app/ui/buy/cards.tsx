import { getAllProducts } from '@/app/libs/actions';
import { Product } from '@prisma/client';
import Image from 'next/legacy/image';
import Link from 'next/link';

// const dummy = [
//   {
//     id: 'fdajo13lkjlsfadsljkjl',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/go-yoon-jung.jpeg',
//   },
//   {
//     id: 'fkldjalfjdkjvlkjlvjkl',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: 'fdasfdsfdsfadsfdsafds',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/hanbok-yoon-jung.jpg',
//   },
//   {
//     id: 'vcvzcxzvczxvczxvzcxvzxc',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju-dancing.jpeg',
//   },
//   {
//     id: 'rqewreqwrewtdqgdgqqrewfq',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/gallery-yoon-jung.jpeg',
//   },
//   {
//     id: 'zfqbqbqbebrberbfbsdbfdbs',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: 'qvasvvfdasfsdfasfdsfasd',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/wow-yoon-jung.jpeg',
//   },
//   {
//     id: 'hynuymyurnnrnununrunuynry',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: 'tyjetnytndfbnxbwtbwwrbw',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/selfie-yoon-jung.jpeg',
//   },
//   {
//     id: 'muyrymuyrmmhrnhtnrtnhnht',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: 'ejyntyenthnbnbfegrffvfff',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/go-yoon-jung.jpeg',
//   },
//   {
//     id: '1',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: '2',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/go-yoon-jung.jpeg',
//   },
//   {
//     id: '3',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: '4',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/go-yoon-jung.jpeg',
//   },
//   {
//     id: '5',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: '6',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/go-yoon-jung.jpeg',
//   },
//   {
//     id: '7',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
//   {
//     id: '8',
//     title: '고윤정',
//     content:
//       '고윤정은 재밌어요. 얼굴이 재밌고, 연기도 재밌고, 아 그냥 재밌어요.',
//     imageUrl: '/buy/go-yoon-jung.jpeg',
//   },
//   {
//     id: '9',
//     title: '민주',
//     content:
//       '민주의 성은 모르겠어요. 이름은 민주일텐데... 잘 알지는 못하는데, 예쁘긴 해요 ㅎ. 아 그리고 아일릿의 멤버랍니다. 근데 암튼 재미있어요 뭐든 걍;;',
//     imageUrl: '/buy/minju.jpg',
//   },
// ];

export default async function CardWrapper() {
  const products = await getAllProducts();
  return (
    <ul className='mx-auto grid grid-cols-1 px-6 gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map((product) => (
        <li key={product.id}>
          <Card item={product} />
        </li>
      ))}
    </ul>
  );
}

export function Card({ item }: { item: Product }) {
  const { id, title, description, imageUrl } = item;

  console.log(imageUrl);

  return (
    <Link href={`/buy/${id}`}>
      <div className='w-[250px] h-[500px] mx-auto flex flex-col shadow-sm hover:shadow-md border rounded-lg overflow-hidden cursor-pointer'>
        <div className='w-full h-[300px] flex-[2] relative rounded-sm overflow-hidden'>
          {!imageUrl && <div>이미지가 없습니다 ㅠㅠ</div>}
          {imageUrl && (
            <Image src={imageUrl} layout='fill' objectFit='cover' alt={title} />
          )}
        </div>
        <div className='flex-1 p-4 flex flex-col justify-between'>
          <span className='text-lg font-semibold'>{title}</span>
          <p className='text-sm line-clamp-3 text-center'>{`"${description}"`}</p>
          <div className='text-end'></div>
        </div>
      </div>
    </Link>
  );
}
