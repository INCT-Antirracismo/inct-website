import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Inter,
  Nunito_Sans,
  Roboto
} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Newspaper } from 'lucide-react';
import localFont from 'next/font/local';

const elza = localFont({
  src: [
    {
      path: './fonts/Elza.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/Elza_Oblique.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './fonts/Elza_Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/Elza_Medium_Oblique.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './fonts/Elza_Semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/Elza_Semibold_Oblique.woff2',
      weight: '600',
      style: 'italic'
    },
    {
      path: './fonts/Elza_Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/Elza_Black.woff2',
      weight: '900',
      style: 'normal'
    }
  ]
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
      <body className={`${elza.className} antialiased`}>
        <nav className="border-b bg-white h-20 w-full">
          <div className="container px-4 flex items-center h-full justify-between mx-auto">
            <div className="left flex gap-4 items-center">
              <Link href="/" title="Página Inicial">
                <img src="/icon.png" alt="" className="size-12" />
              </Link>
              <div className="grid">
                <h1 className="font-bold text-lg">INCT Antirracismo</h1>
                {/* <p className="uppercase text-[10px] text-primary font-medium tracking-wide">
                  Instituto Nacional de Ciência e Tecnologia
                </p>
                <h1 className="text-xs leading-snug font-medium tracking-wide text-pretty">
                  Educação transformadora: Antirracismo, <br />
                  Interseccionalidade e Justiça Social Na América Latina
                </h1> */}
              </div>
            </div>
            <div className="center ">
              <ul className="lg:flex gap-4 items-center hidden">
                <li className="text-base">Institucional</li>
                <li className="text-base">Pesquisa</li>
                <li className="text-base">Frentes</li>
                <li className="text-base">Eventos</li>
                <li className="text-base">Notícias</li>
              </ul>
            </div>
            <div className="right flex gap-2 items-center">
              <Button variant={'ghost'} size={'icon'}>
                <Newspaper />
              </Button>
              <Button variant={'ghost'} size={'icon'}>
                <Menu />
              </Button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
