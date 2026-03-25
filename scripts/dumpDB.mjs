// const collections = [
//   'researchProjects',
//   'publications',
//   'organizations',
//   'persons',
//   'pages',
//   'posts',
//   'events',
//   'media',
//   'files',
//   'definedTerms',
//   'users',
//   'payload-kv',
//   'payload-locked-documents',
//   'payload-preferences',
//   'payload-migrations'
// ];

import { exec } from 'child_process';

const uri = process.env.DATABASE_URL;
const outDir = './backup';

exec(`mongodump --uri="${uri}" --out=${outDir}`, (error, stdout, stderr) => {
  if (error) {
    console.error('Backup failed:', error);
    return;
  }
  console.log('Backup completed');
});
