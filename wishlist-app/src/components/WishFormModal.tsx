import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Wish } from '../types/type';
import Button from './Button';
import FormInput from './FormInput';

interface Props {
  initial?: Partial<Wish>;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function WishFormModal({ initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    price: initial?.price ?? 0,
    image: initial?.image ?? '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        className="bg-gray-300 p-6 rounded w-96 flex flex-col gap-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-[#3e5a09] text-center">
          {initial
            ? "Don't hold back your desires!"
            : "Don't give up on your desires!"}
        </h2>

        <FormInput
          label="Title"
          value={form.title}
          placeholder="Title"
          onChange={(v) => setForm({ ...form, title: v })}
        />
        <FormInput
          label="Description"
          value={form.description}
          placeholder="Description"
          type="textarea"
          onChange={(v) => setForm({ ...form, description: v })}
        />
        <FormInput
          label="Price"
          value={form.price}
          placeholder="Price"
          type="number"
          onChange={(v) => setForm({ ...form, price: Number(v) })}
        />
        <FormInput
          label="Image URL"
          value={form.image}
          placeholder="Image URL"
          onChange={(v) => setForm({ ...form, image: v })}
        />

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
