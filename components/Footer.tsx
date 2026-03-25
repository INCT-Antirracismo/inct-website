import { createDynamicContentURL } from '@/lib/utils/createDynamicContentURL';
import config from '@payload-config';
import Link from 'next/link';
import { getPayload } from 'payload';
const payload = await getPayload({ config });

export type FooterProps = {};

export default async function Footer(props: FooterProps) {
  const data = await payload.findGlobal({
    slug: 'nav',
    depth: 1,
    select: { mainMenu: true }
  });
  return (
    <footer className="bg-dark-blue text-background py-12 w-full block relative mt-16 lg:mt-24">
      <div className="container mx-auto mb-12 grid md:flex gap-3 md:gap-6 items-center justify-center">
        <img src="/icon.png" alt="" className="size-24 mx-auto mb-4 md:m-0" />{' '}
        <div className="grid text-center md:text-left w-fit">
          <p className="uppercase text-xs lg:text-sm mb-1 text-sun font-medium tracking-widest">
            Instituto Nacional de Ciência e Tecnologia
          </p>
          <h1 className="text-base md:text-lg lg:text-xl leading-snug font-bold text-pretty">
            Educação Transformadora: <br className="sm:hidden" />
            Antirracismo,
            <br className="hidden sm:inline" /> Interseccionalidade{' '}
            <br className="sm:hidden" />e Justiça Social Na América Latina
          </h1>
        </div>
        <div className="h-0.5 w-12 md:h-12 md:w-0.5 bg-trinidad rotate-6 md:mx-4 my-4 mx-auto"></div>
        <img
          src="/cnpq_white.png"
          alt=""
          className="h-6 md:h-8 lg:h-10 mx-auto md:mx-0"
        />
      </div>
      <div className="container mx-auto md:flex gap-12 flex-wrap md:justify-center my-12">
        {data.mainMenu.map((menu: any) => (
          <div key={menu.label + 'sidebar'} className="mb-8">
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
                        className="text-lg lg:text-xl font-medium hover:underline p-3 py-1 inline-block"
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
      <div className="container mx-auto flex items-center justify-end gap-3">
        <p className="text-xs text-white/40 tracking-wide text-right text-balance">
          Instituto Nacional de Ciência e Tecnologia Educação Tranformadora:
          Antirracismo, Interseccionalidade e Justiça Social na América Latina.
          <br />
          Desenvolvido por{' '}
          <Link
            href="https://viniciusofp.com.br"
            className="font-semibold hover:underline hover:text-white duration-150"
            target="_blank"
          >
            viniciusofp
          </Link>
          . 2026.
        </p>
        <img src="/icon.png" className="size-8" alt="" />
      </div>
    </footer>
  );
}
