import { Link } from 'react-router-dom';
import type { Wish } from '../context/WishesContext';

interface Props {
  wish: Wish;
  onEdit: () => void;
  onDelete: () => void;
}

export default function WishCard({ wish, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
      <img src={wish.image} className="h-40 w-full object-cover rounded" />
      <h2 className="font-bold text-lg">{wish.title}</h2>
      <p className="text-sm">{wish.description}</p>
      <span className="font-semibold text-blue-600">${wish.price}</span>

      <div className="flex justify-between mt-2">
        <button className="text-green-600" onClick={onEdit}>
          Update
        </button>
        <button className="text-red-500" onClick={onDelete}>
          Delete
        </button>
        <Link to={`/wish/${wish.id}`} className="text-blue-500">
          Details
        </Link>
      </div>
    </div>
  );
}
