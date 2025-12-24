import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PriceSortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      className="border p-2 rounded w-full md:w-1/3"
    >
      <option value="none">Sort by price</option>
      <option value="price_desc">Price high → low</option>
      <option value="price_asc">Price low → high</option>
    </select>
  );
}
