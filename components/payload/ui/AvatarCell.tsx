'use client';

import { Organization, Person } from '@/payload-types';
import { Image, Sparkle, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export type AvatarCellProps = {
  rowData: Person | Organization;
  collectionSlug: string;
};

export function AvatarCellField(props: AvatarCellProps) {
  const [image, setImage] = useState<any>('');
  useEffect(() => {
    fetchImage();
  }, []);
  const fetchImage = async () => {
    const mediaId = (props.rowData as any).image
      ? (props.rowData as any).image
      : (props.rowData as any).logo;
    const res = await fetch(`/api/media/${mediaId}`).then((res) => res.json());
    setImage(res);
  };
  return (
    <a href={`/admin/collections/${props.collectionSlug}/${props.rowData.id}`}>
      <div className="size-12 rounded-full relative overflow-hidden border bg-stone-300 border-slate-200 flex items-center justify-center">
        {image.thumbnailURL || image.url ? (
          <img
            src={image.thumbnailURL || image.url}
            alt={`${image.alt}`}
            className="object-cover object-center w-full h-full"
          />
        ) : (
          <Image className="text-white" />
        )}
      </div>
    </a>
  );
}
