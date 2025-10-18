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
      <body className="min-h-screen bg-[#fefefe] text-gray-900 antialiased">{children}</body>
    </html>
  );
}

