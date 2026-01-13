import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Post } from '@/payload-types';
import Link from 'next/link';

export type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('posts', slug)) as Post | null;
  if (!doc) return <NotFound collectionSlug="posts" />;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>{doc.name}</h1>
      <p className="lead">{doc.description}</p>
      <Link href={'/novidades'}>Lista de posts</Link>
    </div>
  );
}
