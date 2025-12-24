import { useState, useMemo } from 'react';
import { useWishes } from '../context/WishesContext';
import WishCard from '../components/WishCard';
import WishFormModal from '../components/WishFormModal';
import ConfirmModal from '../components/ConfirmModal';
import FilterControls from '../components/FilterControls';
import Button from '../components/Button';
import Pagination from '../components/Pagination';

export default function DashboardPage() {
  const { wishes, remove, create, update } = useWishes();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // filters
  const [search, setSearch] = useState('');
  const [dateSort, setDateSort] = useState('none');
  const [priceSort, setPriceSort] = useState('none');

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let list = [...wishes];

    // search
    if (search.trim()) {
      list = list.filter((w) =>
        w.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // --- SORTING ---

    // 1️⃣ якщо вибрано сортування за датою → головне
    if (dateSort === 'date_desc')
      list.sort((a, b) => b.createdAt - a.createdAt);

    if (dateSort === 'date_asc') list.sort((a, b) => a.createdAt - b.createdAt);

    // 2️⃣ якщо дата "none", але є ціна → сортуємо по ціні
    if (dateSort === 'none') {
      if (priceSort === 'price_desc') list.sort((a, b) => b.price - a.price);
      if (priceSort === 'price_asc') list.sort((a, b) => a.price - b.price);
    }

    return list;
  }, [wishes, search, dateSort, priceSort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Wishlist</h1>

        <Button variant="success" onClick={() => setShowForm(true)}>
          Add Wish
        </Button>
      </div>

      <FilterControls
        search={search}
        dateSort={dateSort}
        priceSort={priceSort}
        notFound={filtered.length === 0}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onDateSortChange={(v) => {
          setDateSort(v);
          setPage(1);
        }}
        onPriceSortChange={(v) => {
          setPriceSort(v);
          setPage(1);
        }}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {pageItems.map((w) => (
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

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      
      {/* Modals */}
      {showForm && (
        <WishFormModal
          initial={
            editingId ? wishes.find((w) => w.id === editingId) : undefined
          }
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
          }}
          onSubmit={(data) => {
            editingId ? update(editingId, data) : create(data);
            setShowForm(false);
            setEditingId(null);
          }}
        />
      )}

      {deleteId && (
        <ConfirmModal
          message={`Do U really want to delete "${
            wishes.find((w) => w.id === deleteId)?.title || ''
          }" ?`}
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
