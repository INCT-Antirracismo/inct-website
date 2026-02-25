import { createDynamicContentURL } from '@/lib/utils';
import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import { Button } from './ui/button';
const payload = await getPayload({ config });

export type FooterProps = {};

export default async function Footer(props: FooterProps) {
  const data = await payload.findGlobal({
    slug: 'nav',
    depth: 1,
    select: { mainMenu: true }
  });
  return (
    <div className="bg-dark-blue text-background py-12 w-full block">
      <div className="container mx-auto mb-5 flex gap-6 items-center">
        <img src="/icon.png" alt="" className="size-24" />{' '}
        <div className="grid">
          <p className="uppercase text-[10px] mb-0.5 text-sun font-medium tracking-widest">
            Instituto Nacional de Ciência e Tecnologia
          </p>
          <h1 className="text-base leading-tight font-black text-pretty lowercase">
            Educação Transformadora: Antirracismo,
            <br /> Interseccionalidade e Justiça Social Na América Latina
          </h1>
        </div>
      </div>
      <div className="container mx-auto h-px bg-white/5 my-8"></div>
      <div className="container mx-auto flex gap-12 flex-wrap">
        {data.mainMenu.map((menu: any) => (
          <div key={menu.label + 'sidebar'} className="">
            <Link
              href={
                menu.items && menu.items!.length > 0
                  ? createDynamicContentURL(
                      (menu.items![0].link!.internalContent as any).value.slug,
                      (menu.items![0].link!.internalContent as any).relationTo
                    )
                  : '#'
              }
            >
              <p className="font-medium text-xs uppercase tracking-widest text-sun p-3">
                {menu.label}
              </p>
            </Link>
            <ul className="grid gap-1">
              {menu.items?.length
                ? menu.items?.map((item: any) => (
                    <li
                      key={menu.label + item.link!.internalContent!.value!.id}
                    >
                      <Link
                        href={createDynamicContentURL(
                          item.link!.internalContent.value.slug,
                          item.link!.internalContent.relationTo
                        )}
                        className="text-sm font-medium hover:underline p-3 py-1.5"
                      >
                        {item.link.linkType === 'internal'
                          ? item.link!.internalContent!.value!.acronym ||
                            item.link!.internalContent!.value!.name
                          : 'Link Externo'}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mx-auto h-px bg-white/5 my-8"></div>
      <div className="container mx-auto">
        <img
          src="https://www.gov.br/cnpq/pt-br/canais_atendimento/identidade-visual/CNPq_v2017_rgb_neg.png"
          alt=""
          className="h-8"
        />
        <p className="text-xs text-white/20 tracking-wide mt-8 text-right">
          Desenvolvido por{' '}
          <Link
            href="https://viniciusofp.com.br"
            className="font-semibold hover:underline hover:text-white duration-150"
          >
            viniciusofp
          </Link>
          . 2026.
        </p>
      </div>
    </div>
  );
}
