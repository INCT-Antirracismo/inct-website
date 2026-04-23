import sharp from 'sharp';
import { s3Storage } from '@payloadcms/storage-s3';

import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Organizations } from './collections/Organizations';
import { DefinedTerms } from './collections/DefinedTerms';
import { Persons } from './collections/Persons';
import { Nav } from './collections/Nav';
import { ResearchProjects } from './collections/ResearchProjects';
import { Files } from './collections/Files';
import { Publications } from './collections/Publications';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Events } from './collections/Events';

import { en } from '@payloadcms/translations/languages/en';
import { pt } from '@payloadcms/translations/languages/pt';

import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';

export default buildConfig({
  plugins: [
    s3Storage({
      collections: {
        media: true,
        files: true
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
        },
        region: process.env.S3_REGION
        // ... Other S3 configuration
      }
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        radio: false,
        email: true,
        state: false,
        country: false,
        checkbox: false,
        number: false,
        message: true,
        date: false,
        payment: false
      },
      redirectRelationships: ['pages']
    })
  ],
  i18n: {
    fallbackLanguage: 'pt', // default
    supportedLanguages: { en, pt }
  },
  localization: {
    locales: ['pt-BR', 'es'],
    defaultLocale: 'pt-BR',
    fallback: true
  },
  maxDepth: 3,
  admin: {
    autoRefresh: true,
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: process.env.DEV_EMAIL || '',
            password: process.env.DEV_PASS || '',
            prefillOnly: true
          }
        : false,
    components: {
      beforeDashboard: ['@/components/payload/BeforeDashboard'],
      graphics: {
        Icon: '@/components/payload/PayloadIcon',
        Logo: '@/components/payload/PayloadLogo'
      },
      Nav: '@/components/payload/Nav#Nav'
    },
    meta: {
      title: 'Painel de administração',
      titleSuffix: ' - INCT Antirracismo',
      description: 'Produção científica a serviço da justiça social.',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/icon.png'
        }
      ]
    }
  },
  editor: lexicalEditor(),
  globals: [Nav],
  collections: [
    ResearchProjects,
    Publications,
    Organizations,
    Persons,
    Pages,
    Posts,
    Events,
    Media,
    Files,
    DefinedTerms,
    Users
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url:
      process.env.NODE_ENV === 'production'
        ? process.env.DATABASE_URL || ''
        : process.env.DATABASE_URL_DEV || ''
  }),
  email: resendAdapter({
    defaultFromAddress: 'site@inctantirracismo.com.br',
    defaultFromName: 'Site INCT Antirracismo',
    apiKey: process.env.RESEND_API_KEY || ''
  }),
  // If you want to resize images, crop, set focal point, etc.
  sharp
});
