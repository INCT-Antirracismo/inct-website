import { Button } from '@/components/ui/button';
import config from '@payload-config';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { getPayload } from 'payload';
import NavButton from './NavButton';
import NavSidebar from './NavSidebar';
import { SidebarTrigger } from './ui/sidebar';

const payload = await getPayload({ config });

export type NavProps = { locale: string };

export default async function Nav({ locale }: NavProps) {
  const data = await payload.findGlobal({
    slug: 'nav',
    depth: 1,
    select: { mainMenu: true },
    locale: locale as any
  });
  const menu = data.mainMenu;
  return (
    <>
      <nav className="border-b bg-white h-16 w-full relativ fixed z-10 top-0">
        <div className="container px-4 flex items-center h-full justify-between mx-auto">
          <Link
            href={`/${locale}`}
            title="Instituto Nacional de Ciência e Tecnologia Educação transformadora: Antirracismo, Interseccionalidade e Justiça Social Na América Latina"
            className="left flex gap-4 items-center"
          >
            <img src="/logo.png" alt="INCT Antirracismo" className="h-11" />
            <div className="h-6 w-0.5 bg-trinidad rotate-6"></div>
            <img src="/cnpq.jpg" alt="Logo CNPq" className="h-5 saturate-0" />
          </Link>
          <div className="center ">
            <ul className="xl:flex items-center hidden">
              {menu.map((menu) => {
                return <NavButton key={menu.label + 'menu'} menu={menu} />;
              })}
            </ul>
          </div>
          <div className="right flex gap-2 items-center xl:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </nav>
      <NavSidebar menu={menu} />
    </>
  );
}
