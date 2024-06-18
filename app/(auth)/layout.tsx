export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className='px-40 py-20 h-[calc(100vh-64px)]'>{children}</main>;
}
