import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import { RootProvider } from 'fumadocs-ui/provider';
import { Toaster } from 'sonner';
import 'katex/dist/katex.min.css';
import './globals.css';
import { siteConfig } from '@/lib/site';

const inter = localFont({
  src: [
    { path: '../../public/fonts/Inter-Latin.woff2', weight: '100 900', style: 'normal' },
    { path: '../../public/fonts/Inter-LatinExt.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

const plusJakarta = localFont({
  src: [
    { path: '../../public/fonts/PlusJakartaSans-Latin.woff2', weight: '200 800', style: 'normal' },
    { path: '../../public/fonts/PlusJakartaSans-LatinExt.woff2', weight: '200 800', style: 'normal' },
  ],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/JetBrainsMono-Latin.woff2', weight: '100 800', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-LatinExt.woff2', weight: '100 800', style: 'normal' },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f7f3' },
    { media: '(prefers-color-scheme: dark)', color: '#070a12' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Vexx — solver-guided decoding for LLMs that must be right',
    template: '%s · Vexx',
  },
  description: siteConfig.description,
  applicationName: 'Vexx',
  authors: [{ name: 'Sahil Gaikwad', url: siteConfig.github }],
  creator: 'Sahil Gaikwad',
  keywords: [
    'LLM structured output',
    'constrained decoding',
    'solver-guided decoding',
    'Pydantic',
    'formal verification',
    'JSON schema',
    'interval arithmetic',
    'proof certificate',
    'structured generation',
  ],
  category: 'developer tools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Vexx',
    title: 'Vexx — make LLM output mathematically true',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vexx — make LLM output mathematically true',
    description: siteConfig.shortDescription,
    creator: '@sahil_gaikwad94',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} min-h-dvh bg-bg-canvas font-sans text-ink-primary antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cobalt-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <RootProvider
          theme={{ attribute: 'class', defaultTheme: 'system', enableSystem: true }}
          search={{ enabled: true }}
        >
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </RootProvider>
      </body>
    </html>
  );
}
