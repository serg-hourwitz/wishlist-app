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
          border border-green-400 bg-green-50 text-green-900
          placeholder-green-400
          p-2 pr-8 rounded w-full
          focus:outline-none focus:ring-2 focus:ring-green-400
        "
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700"
        >
          ✕
        </button>
      )}
    </div>
  );
}
