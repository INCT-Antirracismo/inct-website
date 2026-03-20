import { getDocumentById } from '@/lib/local-api';
import { createDynamicContentURL } from '@/lib/utils';
import { Person, Media } from '@/payload-types';
import { find } from 'lodash';
import Link from 'next/link';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import Image from 'next/image';

export type FacePileProps = { members: Person[] };

export default async function FacePile({ members }: FacePileProps) {
  return (
    <div className="flex -space-x-2">
      {members.map((member) => (
        <Tooltip key={'facePile' + member.id}>
          <TooltipTrigger>
            <Link href={createDynamicContentURL(member.slug, 'persons')}>
              <Face media={member.image} />
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
};

async function Face({ media }: FaceProps) {
  if (typeof media === 'string') {
    media = (await getDocumentById('media', media)) as Media;
  }
  return (
    <div className="inline-block size-12 rounded-full ring-1 ring-layer ring-white overflow-hidden relative shadow-lg brightness-110 contrast-75 hover:brightness-100 hover:contrast-100 duration-150 hover:z-3">
      <img
        className="w-full h-full object-center object-cover"
        src={media?.thumbnailURL || media?.url || ''}
        alt="Avatar"
      />
    </div>
  );
}
