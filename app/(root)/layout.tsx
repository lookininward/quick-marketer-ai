import Nav from "@/components/Nav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="w-full h-screen grid grid-cols-10">
        <Nav />
        <div className="col-span-8">
          {children}
        </div>
      </main>
  );
}
