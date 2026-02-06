/**
 * This is an example of a standalone script that loads in the Payload config
 * and uses the Payload Local API to query the database.
 */

import { getPayload } from 'payload';
import config from '@payload-config';
import fs from 'fs';

import { Organization } from '@/payload-types';

async function run() {
  try {
    const payload = await getPayload({ config });

    const organizations = await payload.find({
      collection: 'organizations',
      select: { name: true },
      limit: 100
    });
    console.log(organizations.docs);
    fs.writeFileSync(
      `./scripts/organizationsIDs.json`,
      JSON.stringify(organizations.docs)
    );
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }

  process.exit(0);
}

await run();
