import Button from '../components/Button';

import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useState } from 'react';
import { useWishes } from '../context/WishesContext';
import ConfirmModal from '../components/ConfirmModal';

export default function WishPage() {
  const { id } = useParams();
  const { wishes, remove, loading } = useWishes();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const currentPage = params.get('page') || '1';

  const [showConfirm, setShowConfirm] = useState(false);

  const wish = wishes.find((w) => w.id === id);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!wish) return <div className="p-6">Wish not found</div>;

  return (
    <div className="p-6">
      <Link className='flex justify-center' to={`/?page=${currentPage}`}>
        <Button
          className='flex items-center gap-2'
          variant="success"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          } 
        >
          Back to Dashboard
        </Button>
      </Link>

      <div className="mt-4 bg-gray-300 shadow p-6 rounded max-w-xl">
        <img src={wish.image} className="rounded mb-5" />
        <h1 className="text-2xl text-gray-900 font-bold mb-3">{wish.title}</h1>
        <p className="mb-2 text-gray-700 font-semibold italic">
          {wish.description}
        </p>
        <span className="font-bold text-2xl text-blue-800">${wish.price}</span>

        <div className="flex justify-end mt-4">
          <Button variant="danger" onClick={() => setShowConfirm(true)}>
            Delete
          </Button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          message={`Do U really want to delete "${wish.title}"?`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            remove(wish.id);
            navigate(`/?page=${currentPage}`);
          }}
        />
      )}
    </div>
  );
}
