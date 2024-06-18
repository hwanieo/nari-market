'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: '구매하기',
    href: '/buy',
  },
  {
    name: '판매하기',
    href: '/sell',
  },
  {
    name: '판매목록',
    href: '/sales-list',
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='flex gap-4'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={clsx('text-[#03045e] font-semibold', {
                'text-[#480ca8]': link.href === pathname,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
