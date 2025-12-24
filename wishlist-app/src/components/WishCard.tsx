import { Link } from 'react-router-dom';
import Button from './Button';
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
      <h2 className="font-bold text-lg text-gray-700">{wish.title}</h2>
      {/* <p className="text-sm text-gray-500">{wish.description}</p> */}
      <span className="font-semibold text-blue-600">${wish.price}</span>

      <div className="flex justify-between mt-2">
        <Button variant="success" size='sm' onClick={onEdit}>
          Update
        </Button>
        <Button variant="danger"  size='sm'onClick={onDelete}>
          Delete
        </Button>
        <Link to={`/wish/${wish.id}`}>
          <Button variant='primary' size='sm'>Details</Button>
        </Link>
      </div>
    </div>
  );
}
