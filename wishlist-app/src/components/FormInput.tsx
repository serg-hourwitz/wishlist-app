import type { ChangeEvent } from 'react';

interface Props {
  label?: string;
  value: string | number;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export default function FormInput({
  label,
  value,
  placeholder,
  type = 'text',
  required = true,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col">
      {label && <label className="font-medium">{label}</label>}
      {type === 'textarea' ? (
        <textarea
          className="border p-2"
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
        />
      ) : (
        <input
          type={type}
          className="border p-2"
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
      )}
    </div>
  );
}
