'use client';

import Nav from "@/components/Nav";
import QueryPovider from "@/api/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryPovider>
      <main className="w-full h-screen grid grid-cols-[80px,1fr] lg:grid-cols-[250px,1fr]">
        <Nav />
        <div className="overflow-hidden">
          {children}
        </div>
      </main>
    </QueryPovider>
  );
}
