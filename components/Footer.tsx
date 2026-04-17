import { DynamicContentLink } from '@/lib/utils/DynamicContentLink';
import config from '@payload-config';
import Link from 'next/link';
import { getPayload } from 'payload';
const payload = await getPayload({ config });

export type FooterProps = { locale: string };

export default async function Footer({ locale }: FooterProps) {
  const data = await payload.findGlobal({
    slug: 'nav',
    depth: 1,
    select: { mainMenu: true },
    locale: locale as any
  });
  return (
    <footer className="bg-dark-blue text-background py-12 w-full block relative mt-16 lg:mt-24">
      <div className="container mx-auto mb-12 grid md:flex gap-3 md:gap-6 items-center justify-center">
        <img
          src="/logo-full-white.png"
          alt="INCT Educação Transformadora: Antirracismo,
Interseccionalidade e Justiça Social Na América Latina"
          className="w-4/5 sm:w-2/3 md:h-20 md:w-auto mx-auto mb-4 md:m-0"
        />
        <div className="h-0.5 w-12 md:h-12 md:w-0.5 bg-trinidad rotate-6 md:mx-4 my-4 mx-auto"></div>
        <img
          src="/cnpq_white.png"
          alt=""
          className="h-6 md:h-8 lg:h-10 mx-auto md:mx-0"
        />
      </div>
      <div className="container mx-auto grid md:flex gap-8 flex-wrap justify-center my-12">
        {data.mainMenu.map((menu: any) => (
          <div
            key={menu.label + 'sidebar'}
            className="mb-8 md:w-[34%] lg:w-auto text-center md:text-left"
          >
            <DynamicContentLink
              slug={
                (menu.link!.internalContent as any)?.value?.slug ||
                (menu.items![0].link!.internalContent as any).value.slug
              }
              collection={
                (menu.link!.internalContent as any)?.relationTo ||
                (menu.items![0].link!.internalContent as any).relationTo
              }
              href={menu.items && menu.items!.length === 0 ? '#' : undefined}
            >
              <p className="font-medium text-xs uppercase tracking-widest text-sun p-3">
                {menu.label}
              </p>
            </DynamicContentLink>

            <ul className="grid gap-1">
              {menu.items?.length
                ? menu.items?.map((item: any) => (
                    <li
                      key={menu.label + item.link!.internalContent!.value!.id}
                    >
                      <DynamicContentLink
                        slug={item.link!.internalContent.value.slug}
                        collection={item.link!.internalContent.relationTo}
                        className="text-lg xl:text-xl font-medium hover:underline decoration-2 decoration-trinidad underline-offset-2 p-3 py-1 inline-block"
                      >
                        {item.link.linkType === 'internal'
                          ? item.link!.internalContent!.value!.acronym ||
                            item.link!.internalContent!.value!.name
                          : 'Link Externo'}
                      </DynamicContentLink>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mx-auto flex items-center gap-3">
        <img src="/icon.png" className="size-8" alt="" />
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
      </div>
    </footer>
  );
}
