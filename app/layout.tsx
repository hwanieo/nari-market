import type { Metadata } from 'next';
import MainNav from '@/app/ui/mainnav';
import { inter } from '@/app/ui/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'NARI MARKET 웹 애플리케이션',
  description: 'NextJS와 Supabase를 활용한 중고 마켓 프로젝트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${inter.className} antialiased`}>
        <MainNav />
        {children}
      </body>
    </html>
  );
}
