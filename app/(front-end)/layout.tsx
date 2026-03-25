import type { Metadata } from 'next';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import localFont from 'next/font/local';
import Nav from '@/components/Nav';
import { SidebarProvider } from '@/components/ui/sidebar';
import Footer from '@/components/Footer';
import config from '@payload-config';
import { getPayload } from 'payload';
import { headers as nextHeaders } from 'next/headers';

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
      path: './fonts/Elza_Semibold.woff2',
      weight: '600',
      style: 'normal'
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

const payload = await getPayload({ config });
export const metadata: Metadata = {
  title: 'INCT Antirracismo',
  description: 'Produção científica a serviço da justiça social.'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // MAINTENANCE MODE CODE
  const headers = await nextHeaders();
  const result = await payload.auth({ headers, canSetHeaders: false });
  if (process.env.NODE_ENV === 'production' && !result.user)
    return (
      <div className="w-full h-svh flex flex-col items-center justify-center text-center">
        <img src="/logo.png" alt="INCT Antirracismo" className="h-16 mb-3" />
        Em breve.
      </div>
    );
  // MAINTENANCE MODE CODE

  return (
    <html lang="en">
      <body className={`${elza.className} antialiased text-black`}>
        <TooltipProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="wrapper pt-16 w-full">
              <Nav />
              {children}
              <Footer />
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
