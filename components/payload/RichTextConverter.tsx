'use client';

import { createDynamicContentURL } from '@/lib/utils';
import { Media } from '@/payload-types';
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedUploadNode
} from '@payloadcms/richtext-lexical';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
  UploadJSXConverter
} from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }

  return createDynamicContentURL(value as any, relationTo);
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
    <Image
      alt={uploadDoc.alt}
      height={uploadDoc.height}
      src={uploadDoc.url}
      width={uploadDoc.width}
    />
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
      <RichText converters={jsxConverters} data={lexicalData} />
    </>
  );
};
