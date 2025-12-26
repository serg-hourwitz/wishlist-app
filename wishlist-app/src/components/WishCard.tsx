import { Link } from 'react-router-dom';
import Button from './Button';
import type { Wish } from '../types/type';
import FlipCard from './FlipCard';

interface Props {
  wish: Wish;
  onEdit: () => void;
  onDelete: () => void;
}

export default function WishCard({ wish, onEdit, onDelete }: Props) {
  return (
    <div className="bg-gray-300 shadow rounded p-4 flex flex-col gap-2">
      <FlipCard
        image={wish.image}
        alt={wish.title}
        backContent={<span>Follow your wishes — they matter 💫</span>}
      />

      <h2 className="font-bold text-2xl text-gray-600">{wish.title}</h2>
      {/* <p className="text-sm text-gray-500">{wish.description}</p> */}
      <span className="font-bold text-lg text-blue-600">${wish.price}</span>

      <div className="flex justify-between flex-col gap-4 sm:flex-row mt-2">
        <Button
          variant="success"
          size="sm"
          className="md:px-4 md:py-2 md:text-base"
          onClick={onEdit}
        >
          Update
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="md:px-4 md:py-2 md:text-base"
          onClick={onDelete}
        >
          Delete
        </Button>
        <Link to={`/wish/${wish.id}`}>
          <Button
            variant="primary"
            size="sm"
            className="w-full md:px-4 md:py-2 md:text-base"
          >
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
