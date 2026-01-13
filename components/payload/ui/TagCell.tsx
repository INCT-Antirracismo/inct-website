import { DefinedTerm, Organization, Person } from '@/payload-types';
import { find } from 'lodash';

export type TagCellProps = {
  rowData: DefinedTerm;
  collectionSlug: string;
  field: any;
};

export async function TagCell(props: TagCellProps) {
  return (
    <a
      href={`/admin/collections/definedTerms?limit=10&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5BadditionalType%5D%5Bequals%5D=${props.rowData.additionalType}&page=1`}
      className="no-underline bg-amber-200 text-black px-3 py-1 rounded-md w-max max-w-sm text-sm hover:bg-amber-300"
    >
      {find(props.field.options, { value: props.rowData.additionalType }).label}
    </a>
  );
}
