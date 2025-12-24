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
      <Link to={`/?page=${currentPage}`}>
        <Button variant='success'>← Back</Button>
      </Link>

      <div className="mt-4 bg-white shadow p-6 rounded max-w-xl">
        <img src={wish.image} className="rounded mb-3" />
        <h1 className="text-2xl font-bold">{wish.title}</h1>
        <p className="mb-2">{wish.description}</p>

        <div className="flex justify-between mt-4">
          <span className="font-bold">${wish.price}</span>

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
