import { createDynamicContentURL } from '@/lib/utils';
import { Post } from '@/payload-types';
import config from '@payload-config';
import Link from 'next/link';
import { getPayload } from 'payload';

const payload = await getPayload({ config });
export type PostsPageProps = {};

export default async function PostsPage(props: PostsPageProps) {
  const data = await payload.find({
    collection: 'posts'
  });
  if (!data) return null;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>Lista de Posts</h1>
      {data.docs.map((doc: Post) => {
        return (
          <div key={doc.id + '_event'}>
            <Link href={createDynamicContentURL(doc, 'posts')}>
              <h3>{doc.name}</h3>
            </Link>
            <p>{doc.description}</p>
          </div>
        );
      })}
      <Link href={'/'}>Página Inicial</Link>
    </div>
  );
}
