import type { ChangeEvent } from 'react';
import './SelectStyles.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function DateSortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      className="custom-select border-[#7FB51E] bg-green-50 text-[#7FB51E] p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#7FB51E] font-bold cursor-pointer"
    >
      <option value="none">Sort by date</option>
      <option value="date_desc">Newest first</option>
      <option value="date_asc">Oldest first</option>
    </select>
  );
}
