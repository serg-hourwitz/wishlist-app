import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, placeholder, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border p-2 rounded w-full md:w-1/3"
    />
  );
}
