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
import { Footer } from './collections/Footer';
import { Events } from './collections/Events';

import { en } from '@payloadcms/translations/languages/en';
import { pt } from '@payloadcms/translations/languages/pt';

export default buildConfig({
  plugins: [
    s3Storage({
      collections: {
        media: true
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
    })
  ],
  i18n: {
    fallbackLanguage: 'pt', // default
    supportedLanguages: { en, pt }
  },
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
  globals: [Nav, Footer],
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
    url: process.env.DATABASE_URL || ''
  }),
  email: resendAdapter({
    defaultFromAddress: 'onboarding@resend.dev',
    defaultFromName: 'Site INCT Antirracismo',
    apiKey: process.env.RESEND_API_KEY || ''
  }),
  // If you want to resize images, crop, set focal point, etc.
  sharp
});
