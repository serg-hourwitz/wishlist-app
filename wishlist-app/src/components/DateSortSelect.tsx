import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function DateSortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      className="border p-2 rounded w-full md:w-1/3"
    >
      <option value="none">Sort by date</option>
      <option value="date_desc">Newest first</option>
      <option value="date_asc">Oldest first</option>
    </select>
  );
}
