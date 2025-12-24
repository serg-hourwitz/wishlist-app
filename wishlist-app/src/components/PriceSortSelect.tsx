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
      className="custom-select border-green-400 bg-green-50 text-green-400 p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400 font-bold"
    >
      <option value="none">
        Sort by price
      </option>
      <option value="price_desc">Price high → low</option>
      <option value="price_asc">Price low → high</option>
    </select>
  );
}
