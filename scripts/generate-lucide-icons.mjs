import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Lucide icons live here
const lucideDir = path.join(
  ROOT,
  'node_modules',
  'lucide-react',
  'dist',
  'esm',
  'icons'
);

// Convert ArrowDown → arrow-down
const toKebabCase = (str) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

// Read icon filenames
const icons = fs
  .readdirSync(lucideDir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => file.replace('.js', ''))
  .map(toKebabCase)
  .sort();

// Output file
const output = `// ⚠️ AUTO-GENERATED — do not edit manually
export const LUCIDE_ICONS = ${JSON.stringify(icons, null, 2)} as const;

export type LucideIconName = typeof LUCIDE_ICONS[number];
`;

fs.writeFileSync(path.join(ROOT, './lib/lucide-icons.ts'), output);

console.log(`✔ Generated ${icons.length} Lucide icons`);
