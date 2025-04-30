import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Web3Providers } from '@/lib/web3/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZoraSage - AI-Powered Trading & Creation Suite for Zora Coins',
  description: 'Maximize your earnings and optimize your portfolio in the Zora ecosystem with AI-driven insights',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Providers>
            {children}
            <Toaster />
          </Web3Providers>
        </ThemeProvider>
      </body>
    </html>
  );
} 