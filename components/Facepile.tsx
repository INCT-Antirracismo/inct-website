import { getDocumentById } from '@/lib/local-api';
import { createDynamicContentURL } from '@/lib/utils/createDynamicContentURL';
import { Media, Person } from '@/payload-types';
import Link from 'next/link';
import { useId } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export type FacePileProps = { members: Person[] };

export default async function FacePile({ members }: FacePileProps) {
  const id = useId();
  return (
    <div className="flex -space-x-2 flex-wrap">
      {members.map((member) => (
        <Tooltip key={'facePile' + member.id + id}>
          <TooltipTrigger>
            <Link href={createDynamicContentURL(member.slug, 'persons')}>
              <Face media={member.image} name={member.name} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>{member.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

type FaceProps = {
  media?: Media | string | null;
  name: string;
};

async function Face({ media, name }: FaceProps) {
  if (typeof media === 'string') {
    media = (await getDocumentById('media', media)) as Media;
  }
  return (
    <div className="inline-block size-12 rounded-full ring-1 ring-layer bg-background ring-white overflow-hidden relative shadow-lg brightness-110 contrast-75 hover:brightness-100 hover:contrast-100 duration-150 hover:z-3">
      <img
        className="w-full h-full object-center object-cover"
        src={media?.thumbnailURL || media?.url || ''}
        alt={name}
      />
    </div>
  );
}
