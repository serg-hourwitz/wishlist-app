import type { ChangeEvent } from 'react';

interface Props {
  label: string;
  value: string | number;
  type?: 'text' | 'number' | 'textarea';
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function FormInput({
  label,
  value,
  type = 'text',
  placeholder,
  onChange,
}: Props) {
  const commonClasses =
    'border border-[#7FB51E] bg-green-50 text-[#7FB51E] placeholder-[#7FB51E] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#7FB51E]';

  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-[#7FB51E]">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          placeholder={placeholder}
          required
          className={`${commonClasses} resize-none`}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          required
          className={commonClasses}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
      )}
    </div>
  );
}
