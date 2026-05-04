'use client';
import ReactPlayer from 'react-player';
import { cn } from '@/lib/utils';
import { collectionMap } from '@/lib/utils/DynamicContentLink';
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedUploadNode
} from '@payloadcms/richtext-lexical';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText
} from '@payloadcms/richtext-lexical/react';
import React, { useEffect, useState } from 'react';
import SocialMediaBar from './socialMedia/SocialMediaBar';
import Buttons from './Buttons';

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }

  if (collectionMap[relationTo] !== undefined) {
    return `${collectionMap[relationTo]}/${value.slug}`;
  } else {
    return `/${relationTo}/${value.slug}`;
  }
};

// Custom upload converter component that uses next/image
const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode;
}> = ({ node }) => {
  const [uploadDoc, setUploadDoc] = useState<any>();

  useEffect(() => {
    if (node.relationTo === 'media') {
      if (typeof node.value !== 'object') {
        fetchDoc();
      } else {
        setUploadDoc(node.value);
      }
    }
  }, [node]);

  const fetchDoc = async () => {
    await fetch(`/api/media/${node.value}`)
      .then((res) => res.json())
      .then((res) => setUploadDoc(res));
  };
  if (!uploadDoc) return null;

  return (
    <figure className="">
      <img
        alt={uploadDoc.alt}
        height={uploadDoc.height}
        src={
          uploadDoc?.sizes?.half?.url
            ? uploadDoc?.sizes?.half?.url
            : uploadDoc.url
        }
        width={uploadDoc.width}
      />
      {uploadDoc.alt ? (
        <figcaption>
          {uploadDoc.alt} {uploadDoc.author ? <>({uploadDoc.author})</> : null}
        </figcaption>
      ) : null}
    </figure>
  );
};

const CustomVideoEmbedComponent: React.FC<{
  node: SerializedUploadNode;
}> = ({ node }) => {
  return (
    <div className="aspect-video w-full md:w-[73ch] md:-ml-[4ch] lg:w-[85ch] lg:-ml-[10ch]">
      <ReactPlayer
        width={'100%'}
        height={'100%'}
        src={node.fields.url || node.fields.image}
      />
    </div>
  );
};

const ButtonsBlock: React.FC<{
  node: SerializedUploadNode;
}> = ({ node }) => {
  return (
    <div className="flex items-center gap-2 my-3 not-prose *:text-base flex-wrap">
      <Buttons buttons={node.fields.buttons} />
    </div>
  );
};

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Override the default upload converter
  upload: ({ node }) => {
    return <CustomUploadComponent node={node} />;
  },
  blocks: {
    videoEmbed: ({ node }: any) => <CustomVideoEmbedComponent node={node} />,
    code: ({ node }: any) => {
      return (
        <div
          className="md:min-w-[65ch] w-full"
          dangerouslySetInnerHTML={{ __html: node.fields.code }}
        ></div>
      );
    },
    socialMedia: ({ node }: any) => {
      return (
        <SocialMediaBar
          className={'fill-trinidad size-5'}
          data={node.fields.socialMedia}
        />
      );
    },
    buttons: ({ node }: any) => {
      return <ButtonsBlock node={node} />;
    }
  }
});

export const CustomRichText: React.FC<{
  lexicalData: SerializedEditorState;
  className?: string;
}> = ({ lexicalData, className }) => {
  return (
    <>
      <RichText
        converters={jsxConverters}
        data={lexicalData}
        className={cn(
          'text-pretty prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-trinidad-600 prose-a:hover:text-trinidad-600 prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex] prose-h1:font-bold',
          className ? className : 'lg:prose-lg xl:prose-xl'
        )}
      />
    </>
  );
};
