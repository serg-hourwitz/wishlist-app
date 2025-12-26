import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, placeholder, onChange }: Props) {
  return (
    <div className="relative w-full md:w-1/3">
      <input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="
          border border-[#7FB51E] bg-green-50 text-[#7FB51E]
          placeholder-[#7FB51E] font-bold
          p-4 pr-8 rounded w-full
          focus:outline-none focus:ring-2 focus:ring-[#7FB51E]
        "
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7FB51E] hover:text-[#6e9c17]"
        >
          ✕
        </button>
      )}
    </div>
  );
}
