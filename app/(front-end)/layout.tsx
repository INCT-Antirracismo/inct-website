import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Inter,
  Nunito_Sans,
  Roboto
} from 'next/font/google';
import './globals.css';

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'INCT Antirracismo',
  description: 'Produção científica a serviço da justiça social.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
