import { useState, useMemo } from 'react';
import { useWishes } from '../context/WishesContext';
import type { Wish } from '../context/WishesContext';
import WishCard from '../components/WishCard';
import WishFormModal from '../components/WishFormModal';
import ConfirmModal from '../components/ConfirmModal';

type DateFilter = 'Newest' | 'Oldest' | '';
type PriceFilter = 'High to Low' | 'Low to High' | '';

const PAGE_SIZE = 6; // кількість бажань на сторінку

export default function DashboardPage() {
  const { wishes, remove, create, update, loading } = useWishes();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [dateFilter, setDateFilter] = useState<DateFilter>('Newest');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('');

  const [currentPage, setCurrentPage] = useState(1);

  // Сортування по одному активному фільтру
  const filteredWishes = useMemo(() => {
    let sorted = [...wishes];

    if (dateFilter) {
      sorted.sort((a, b) =>
        dateFilter === 'Newest'
          ? b.createdAt - a.createdAt
          : a.createdAt - b.createdAt
      );
    } else if (priceFilter) {
      sorted.sort((a, b) =>
        priceFilter === 'High to Low' ? b.price - a.price : a.price - b.price
      );
    }

    return sorted;
  }, [wishes, dateFilter, priceFilter]);

  const totalPages = Math.ceil(filteredWishes.length / PAGE_SIZE);
  const paginatedWishes = filteredWishes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSubmit = (
    data: Omit<Wish, 'id' | 'createdAt'> | Partial<Wish>
  ) => {
    if (editingId) update(editingId, data);
    else create({ ...data, createdAt: Date.now() } as Omit<Wish, 'id'>);
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Wish
        </button>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <div>
          <label className="mr-2 font-semibold">Date:</label>
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value as DateFilter);
              setPriceFilter('');
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">None</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Price:</label>
          <select
            value={priceFilter}
            onChange={(e) => {
              setPriceFilter(e.target.value as PriceFilter);
              setDateFilter('');
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">None</option>
            <option value="High to Low">High to Low</option>
            <option value="Low to High">Low to High</option>
          </select>
        </div>
      </div>

      {paginatedWishes.length === 0 && <div>No wishes found</div>}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {paginatedWishes.map((w) => (
          <WishCard
            key={w.id}
            wish={w}
            onEdit={() => {
              setEditingId(w.id);
              setShowForm(true);
            }}
            onDelete={() => setDeleteId(w.id)}
          />
        ))}
      </div>

      {/* Пагінація */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-gray-300' : ''
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {showForm && (
        <WishFormModal
          initial={
            editingId ? wishes.find((w) => w.id === editingId) : undefined
          }
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {deleteId && (
        <ConfirmModal
          message="Delete wish?"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            remove(deleteId);
            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
