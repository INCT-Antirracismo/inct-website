import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Organizations } from './collections/Organizations';
import { DefinedTerms } from './collections/DefinedTerms';
import { Persons } from './collections/Persons';
import { en } from '@payloadcms/translations/languages/en';
import { pt } from '@payloadcms/translations/languages/pt';
import { Nav } from './collections/Nav';
import { ResearchProjects } from './collections/ResearchProjects';
import { resendAdapter } from '@payloadcms/email-resend';
import { Files } from './collections/Files';
import { Publications } from './collections/Publications';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Footer } from './collections/Footer';
import { Events } from './collections/Events';

export default buildConfig({
  i18n: {
    fallbackLanguage: 'pt', // default
    supportedLanguages: { en, pt }
  },
  admin: {
    autoRefresh: true,
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'viniciusofp@gmail.com',
            password: 'digiteumasenhasegura',
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
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.NODE_ENV === 'production'
          ? process.env.DATABASE_URI
          : process.env.DATABASE_URI_DEV
    }
  }),
  email: resendAdapter({
    defaultFromAddress: 'onboarding@resend.dev',
    defaultFromName: 'Site INCT Antirracismo',
    apiKey: process.env.RESEND_API_KEY || ''
  }),
  // If you want to resize images, crop, set focal point, etc.
  sharp
});
