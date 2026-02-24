import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { getDocBySlug } from '@/lib/local-api';
import { Publication } from '@/payload-types';
import { TrafficCone } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
Image;

export type PublicationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = (await getDocBySlug('publications', slug)) as Publication | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

export default async function PublicationPage({
  params
}: PublicationPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('publications', slug)) as Publication | null;
  if (!doc) return <NotFound collectionSlug="publications" />;
  const { name, description, image } = doc;
  return (
    <div className="container mx-auto">
      {/* <div className="bg-sun-300 p-2 rounded-full w-fit">
        <TrafficCone className="text-trinidad size-6 " />
      </div> */}
      <div className="grid sm:flex sm:items-center gap-6 my-8">
        <div className="relative h-[16svh] sm:h-auto sm:w-1/5 sm:max-w-56 overflow-hidden rounded-xl border ">
          {image! && typeof image !== 'string' && image.url && (
            <Image
              width={300}
              height={400}
              loading="lazy"
              src={image?.url}
              alt={image?.alt}
              className="w-full h-full object-center object-cover m-0! duration-300 ease-in-out group-hover:scale-102"
            />
          )}
        </div>
        <div className="w-full">
          <h2
            id="projetos-de-pesquisa"
            className="uppercase text-sm md:text-base lg:text-lg xl:text-xl tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance"
          >
            Publicação
          </h2>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4 text-balance">
            {name}
          </h1>

          {/* DESCRIÇÃO */}
          <p className="text-brown text-lg lg:text-2xl text-balance leading-normal! max-w-prose">
            {description}
          </p>
        </div>
      </div>
      <div className=" my-8">
        {/* <p className="text-xs!">{JSON.stringify(doc.body)}</p> */}
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </div>
  );
}
