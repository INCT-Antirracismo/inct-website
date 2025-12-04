import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { Users } from './collections/Users';
import { Places } from './collections/Places';
import { Media } from './collections/Media';
import { Organizations } from './collections/Organizations';
import { DefinedTerms } from './collections/DefinedTerms';
import { Persons } from './collections/Persons';

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Icon: '@/components/payload/PayloadIcon'
      }
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

  // Define and configure your collections in this array
  collections: [Organizations, Persons, Users, Places, DefinedTerms, Media],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URI
    }
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp
});
