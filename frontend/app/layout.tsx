"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Link from 'next/link';
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { client } from "@/lib/client";
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from '@/components/layout/main-layout';

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThirdwebProvider>
        <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
            <MainLayout>
              <main className="py-8">
                {children}
              </main>
            </MainLayout>
            <Toaster />
          <footer className="border-t py-6">
            <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} ZoraSage. Built on <a href="https://base.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rootstock</a></p>
            </div>
          </footer>
        </ThemeProvider>
        </QueryClientProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
