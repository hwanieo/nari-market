import { nunito } from '@/app/ui/fonts';

export default function Home() {
  return (
    <main
      className={`${nunito.className} antialiased flex h-[calc(100vh-64px)] flex-col items-center justify-between p-24`}
    >
      홈 페이지
    </main>
  );
}
