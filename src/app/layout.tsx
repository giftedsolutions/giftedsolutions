import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { env } from '@/config/env';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${env.businessName} - Arduino & Electronics Components Shop`,
  description:
    'Shop for Arduino boards, sensors, modules, and electronics components in Zambia. Countrywide delivery available. Electronics projects and consultation services offered.',
  keywords: [
    'Arduino',
    'Electronics',
    'Zambia',
    'Components',
    'Sensors',
    'Lusaka',
    'Development Boards',
    'ESP32',
    'Raspberry Pi',
  ],
  authors: [{ name: env.businessName }],
  manifest: '/manifest.json',
  themeColor: '#4b0082',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Gifted Solutions',
  },
  openGraph: {
    title: `${env.businessName} - Arduino & Electronics Shop`,
    description: 'Your one-stop shop for Arduino and electronics components in Zambia',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#fefefe] text-gray-900 antialiased">{children}</body>
    </html>
  );
}

