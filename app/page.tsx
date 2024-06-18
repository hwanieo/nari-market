import { nunito } from '@/app/ui/fonts';

export default function Home() {
  return (
    <main
      className={`${nunito.className} antialiased flex min-h-screen flex-col items-center justify-between p-24`}
    >
      홈 페이지
    </main>
  );
}
