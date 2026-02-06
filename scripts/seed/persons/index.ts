/**
 * This is an example of a standalone script that loads in the Payload config
 * and uses the Payload Local API to query the database.
 */

import { getPayload } from 'payload';
import config from '@payload-config';

import fs from 'fs';
import organizationsIDs from './organizationsIDs.json' with { type: 'json' };
import personsData from './rawData';
import { Organization, Person } from '@/payload-types';
import OpenAI from 'openai';
import Bottleneck from 'bottleneck';
import data from './aiData.json';

console.log(personsData.length);

// limiter: ajuste conforme sua API
const limiter = new Bottleneck({
  maxConcurrent: 3, // quantas requisições ao mesmo tempo
  minTime: 300 // intervalo mínimo entre chamadas (ms)
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const organizationsArray = organizationsIDs.reduce((prev: any[], curr) => {
  return [...prev, [curr.name, curr.id]];
}, []);

export async function parseDataWithAI(personData: string) {
  const prompt = `You are a parser used to seed content inside a Payload CMS. You will receive some text containing the details of a researcher and must convert it to the patterns of the following sample document. You must return ONLY VALID JSON, no markdown, no formatting.

SAMPLE DOCUMENT:
{
  name: 'Glenda Cristina Valim de Melo', // Name of the researcher
  slug: 'glenda-cristina-valim-de-melo', // The value of property name using only "a-z" and "-"
  memberOf: [
    {
      relationType: ['697a9230c5825584fcdc1571', '697bac0eec695eb47b365dc1'], // Keep this value.
      relationTo: {
        relationTo: 'organizations', // Keep this value.
        value: 'ID_DA_ORGANIZACAO' // Insert here the ID of the researcher's organization, based on the given organization IDs array.
      }
    }
  ],
  description:
    'Performatividade, discurso, raça e Interseccionalidade | Discurso, raça e mídia | discurso sobre a  obstétrica da mulher negra na mídia | Formação de professores de inglês, raça e ensino de língua inglesa.', // The researcher's short description. The maximum length is 256 characters! It must contain topics separated with "|", as we see in Linkedin profiles. Every topic must start with uppercase letter.
  email: 'glendamelo@letras.ufrj.br', // The researcher's email, if providen. Omit this field if not providen.
  lattesUrl: 'http://lattes.cnpq.br/6215257502502767', // The researcher's Lattes URL, if providen. Omit this field if not providen.
  pronouns: 'Feminino', // The researcher's genre. Accepts "Feminino" or "Masculino".
  orcidUrl: 'https://orcid.org/0000-0002-1878-5710' // The researcher's Orcid URL, if providen. Omit this field if not providen.
}

ORGANIZATION IDS ARRAY:
${JSON.stringify(organizationsArray)}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: personData }
    ]
  });

  return JSON.parse(response.choices[0].message.content!);
}

async function enrich(items: string[]) {
  return Promise.all(
    items.map((item, i) =>
      limiter.schedule(async () => {
        const res = await parseDataWithAI(item);
        console.log(i + '/' + items.length);
        console.log(res.name);
        return res;
      })
    )
  );
}

async function run() {
  try {
    const payload = await getPayload({ config });
    // const enriched = await enrich(personsData);
    // fs.writeFileSync(
    //   `./scripts/seed/persons/aiData.json`,
    //   JSON.stringify(enriched)
    // );
    // console.log(JSON.stringify(enriched));
    for (const person of data) {
      await payload.create({
        collection: 'persons',
        data: {
          ...person,
          inctPosition: ['697bac0eec695eb47b365dc1']
        } as Person,
        disableTransaction: true
      });
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }

  process.exit(0);
}

await run();
