import { useState, useMemo } from 'react';
import { useWishes } from '../context/WishesContext';
import WishCard from '../components/WishCard';
import WishFormModal from '../components/WishFormModal';
import ConfirmModal from '../components/ConfirmModal';
import FilterControls from '../components/FilterControls';
import Button from '../components/Button';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

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
  const perPage = 3;

  const filtered = useMemo(() => {
    let list = [...wishes];

    // SEARCH
    if (search.trim()) {
      list = list.filter((w) =>
        w.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    list.sort((a, b) => {
      const dayA = new Date(a.createdAt).setHours(0, 0, 0, 0);
      const dayB = new Date(b.createdAt).setHours(0, 0, 0, 0);

      // --- DATE SORT ---
      if (dateSort !== 'none') {
        const dateResult = dateSort === 'date_desc' ? dayB - dayA : dayA - dayB;

        if (dateResult !== 0) return dateResult;
      }

      // --- PRICE SORT ---
      if (priceSort !== 'none') {
        return priceSort === 'price_desc'
          ? b.price - a.price
          : a.price - b.price;
      }

      return 0;
    });

    return list;
  }, [wishes, search, dateSort, priceSort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="py-6 px-2 sm:px-6 lg:px-12">
      <div className="flex mb-14 flex-col md:flex-row items-center p-6 bg-gray-700 rounded">
        <Link
          to="https://en.wikipedia.org/wiki/Robert_Burton_(scholar)"
          target="_blank"
          rel="noopener noreferrer"
          className='w-full'
        >
          <img
            className="rounded w-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Burton_grand.jpg/250px-Burton_grand.jpg"
            alt=" Robert Burton"
          />
        </Link>
        <div className="p-4">
          <h1 className="mb-4">
            <blockquote className="text-4xl sm:text-6xl font-bold italic">
              "Desire hath no rest"
            </blockquote>
          </h1>
          <p>
            Robert Burton, an English scholar and writer of the 17th century, in
            his magnum opus "Anatomy of Melancholy", viewed desire as an endless
            and insatiable force, a source of melancholy and passions, comparing
            it to eternal torture, where there is no rest, leading to suffering,
            but at the same time being a driving force for man, pushed by the
            "good" and "evil" angels. 
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-28 flex-col-reverse sm:flex-row gap-4">
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
        <Button
          className="flex items-center gap-3"
          variant="success"
          size="lg"
          onClick={() => setShowForm(true)}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          Add Wish
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
