import { useParams, Link, useNavigate } from 'react-router-dom';
import { useWishes } from '../context/WishesContext';

export default function WishPage() {
  const { id } = useParams<{ id: string }>();
  const { wishes, remove, loading } = useWishes();
  const nav = useNavigate();

  const wish = wishes.find((w) => w.id === id);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!wish) return <div className="p-6">Wish not found</div>;

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-500 underline">
        ← Back
      </Link>

      <div className="mt-4 bg-white shadow p-6 rounded max-w-xl">
        <img src={wish.image} className="rounded mb-3" />
        <h1 className="text-2xl font-bold">{wish.title}</h1>
        <p className="mb-2">{wish.description}</p>

        <div className="flex justify-between mt-4 items-center">
          <span className="font-bold">${wish.price}</span>
          <span className="text-gray-500">
            Added: {new Date(wish.createdAt).toLocaleString()}
          </span>

          <button
            className="text-red-600"
            onClick={() => {
              remove(wish.id);
              nav('/');
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
