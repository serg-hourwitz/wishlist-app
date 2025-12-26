import type { ChangeEvent } from 'react';
import './SelectStyles.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PriceSortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      className="custom-select border-[#7FB51E] bg-green-50 text-[#7FB51E] p-4 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#7FB51E] font-bold cursor-pointer"
    >
      <option value="none">
        Sort by price
      </option>
      <option value="price_desc">Price high → low</option>
      <option value="price_asc">Price low → high</option>
    </select>
  );
}
