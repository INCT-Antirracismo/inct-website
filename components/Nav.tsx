import { Button } from '@/components/ui/button';
import config from '@payload-config';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { getPayload } from 'payload';
import NavButton from './NavButton';
import NavSidebar from './NavSidebar';
import { SidebarTrigger } from './ui/sidebar';

const payload = await getPayload({ config });

export type NavProps = {};

export default async function Nav(props: NavProps) {
  const data = await payload.findGlobal({
    slug: 'nav',
    depth: 1,
    select: { mainMenu: true }
  });
  const menu = data.mainMenu;
  return (
    <>
      <nav className="border-b bg-white h-16 w-full relativ fixed z-10 top-0">
        <div className="container px-4 flex items-center h-full justify-between mx-auto">
          <Link
            href="/"
            title="Página Inicial"
            className="left flex gap-4 items-center"
          >
            <img src="/icon.png" alt="" className="size-10" />
            <div className="grid">
              <h1 className="font-bold text-lg lg:text-xl">
                INCT Antirracismo
              </h1>
              {/* <p className="uppercase text-[10px] text-primary font-medium tracking-wide">
                  Instituto Nacional de Ciência e Tecnologia
                </p>
                <h1 className="text-xs leading-snug font-medium tracking-wide text-pretty">
                  Educação transformadora: Antirracismo, <br />
                  Interseccionalidade e Justiça Social Na América Latina
                </h1> */}
            </div>
          </Link>
          <div className="center ">
            <ul className="lg:flex items-center hidden">
              {menu.map((menu) => {
                return <NavButton key={menu.label + 'menu'} menu={menu} />;
              })}
            </ul>
          </div>
          <div className="right flex gap-2 items-center lg:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </nav>
      <NavSidebar menu={menu} />
    </>
  );
}
