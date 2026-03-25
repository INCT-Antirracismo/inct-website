'use client';

import { cn } from '@/lib/utils';
import { createDynamicContentURL } from '@/lib/utils/createDynamicContentURL';
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

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }

  return createDynamicContentURL(value.slug as string, relationTo);
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

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Override the default upload converter
  upload: ({ node }) => {
    return <CustomUploadComponent node={node} />;
  }
});

export const CustomRichText: React.FC<{
  lexicalData: SerializedEditorState;
}> = ({ lexicalData }) => {
  return (
    <>
      <RichText
        converters={jsxConverters}
        data={lexicalData}
        className={cn(
          'text-pretty prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-trinidad-600 prose-a:hover:text-trinidad-600 prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex]'
        )}
      />
    </>
  );
};
