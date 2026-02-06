/**
 * This is an example of a standalone script that loads in the Payload config
 * and uses the Payload Local API to query the database.
 */

import { getPayload } from 'payload';
import config from '@payload-config';

import organizations from './organizations.json';
import { Organization } from '@/payload-types';

async function run() {
  try {
    const payload = await getPayload({ config });

    for (let organization of organizations) {
      organization = {
        ...organization,
        acronym: organization.acronym,
        // @ts-ignore
        type: '697a9258c5825584fcdc15a1'
      };
      await payload.create({
        collection: 'organizations',
        data: organization as Organization
      });
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }

  process.exit(0);
}

await run();
