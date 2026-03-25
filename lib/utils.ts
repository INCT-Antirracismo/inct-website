import { DefinedTerm } from '@/payload-types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const applyPronounsToDefinedTerm = (
  pronouns: 'Masculino' | 'Feminino' | 'Neutro' | null | undefined,
  definedTerm: DefinedTerm
) => {
  return pronouns === 'Feminino' && definedTerm.nameFemale
    ? definedTerm.nameFemale
    : pronouns === 'Masculino' && definedTerm.nameMale
      ? definedTerm.nameMale
      : definedTerm.name;
};

export const buildListSentence = (strings: string[]) => {
  if (strings.length === 1) return strings[0];
  let last = strings.pop();
  return (
    strings.map((str, i) => (i === 0 ? str : str.toLowerCase())).join(', ') +
    ' e ' +
    last?.toLowerCase()
  );
};
