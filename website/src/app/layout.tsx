import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Toaster } from 'sonner';
import '../globals.css';

const inter = Inter({ subsets: ['lins'], variable: '--font-inter', display: 'swap' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['lins'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['lins'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F6' },
    { media: '(prefers-color-scheme: dark)', color: '#090C15' },
  ],
};

export const metadata: Metadata = {
  title: {
    template: '%s | Veritas',
    default: 'Veritas — Verified Mathematical Truth for LLMs',
  },
  description:
    'Pydantic ergonomics on the surface; dependency-free Rust theorem proving underneath. Veritas enforces algebraic equations, temporal logic, and domain invariants directly inside the token-generation loop.',
  openGraph: {
    siteName: 'Veritas',
    title: 'Veritas — Verified Mathematical Truth for LLMs',
    description:
      'Pydantic ergonomics on the surface; dependency-free Rust theorem proving underneath.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veritas — Verified Mathematical Truth for LLMs',
    creator: '@sahil_gaikwad94',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} ${plusJakartaSans.className} ${jetBrainsMono.className} flex flex-col min-h-screen`}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <RootProvider>
            {children}
            <Toaster position="top-right" richColors />
          </RootProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
