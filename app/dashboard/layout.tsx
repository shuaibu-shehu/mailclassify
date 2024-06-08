import { Navbar } from "@/components/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    
      <main className={' relative w-full min-h-screen'}>
        <Navbar />
        {children}
        </main>
  );
}
