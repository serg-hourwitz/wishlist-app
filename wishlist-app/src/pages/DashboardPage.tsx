import { useState, useMemo, useEffect } from 'react';
import { useWishes } from '../context/WishesContext';
import HeroPage from '../components/HeroPage';
import WishCard from '../components/WishCard';
import WishFormModal from '../components/WishFormModal';
import ConfirmModal from '../components/ConfirmModal';
import FilterControls from '../components/FilterControls';
import Button from '../components/Button';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';

export default function DashboardPage() {
  const { wishes, remove, create, update } = useWishes();

  const [searchParams, setSearchParams] = useSearchParams();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // filters 
  const [search, setSearch] = useState('');
  const [dateSort, setDateSort] = useState('none');
  const [priceSort, setPriceSort] = useState('none');

  // pagination from URL
  const pageFromUrl = Number(searchParams.get('page') || 1);
  const [page, setPage] = useState(pageFromUrl);
  const perPage = 3;

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const changePage = (newPage: number) => {
    setPage(newPage);
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = [...wishes];

    // SEARCH
    if (search.trim()) {
      list = list.filter((w) =>
        w.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORT (два одночасно)
    list.sort((a, b) => {
      const dayA = new Date(a.createdAt).setHours(0, 0, 0, 0);
      const dayB = new Date(b.createdAt).setHours(0, 0, 0, 0);

      // DATE SORT
      if (dateSort !== 'none') {
        const dateResult = dateSort === 'date_desc' ? dayB - dayA : dayA - dayB;

        if (dateResult !== 0) return dateResult;
      }

      // PRICE SORT
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

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      changePage(1);
    }
  }, [totalPages]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="py-6 px-2 sm:px-6 lg:px-12">
      {/* Hero */}
      <HeroPage
        title='"Desire hath no rest"'
        subtitle='Robert Burton, an English scholar and writer of the 17th century, in his
      magnum opus "Anatomy of Melancholy", viewed desire as an endless and
      insatiable force, a source of melancholy and passions, comparing it to
      eternal torture, where there is no rest, leading to suffering, but at the
      same time being a driving force for man, pushed by the "good" and "evil"
          angels. '
      />

      {/* Filters + Add */}
      <div className="flex justify-between items-center mb-28 flex-col-reverse sm:flex-row gap-4">
        <FilterControls
          search={search}
          dateSort={dateSort}
          priceSort={priceSort}
          notFound={filtered.length === 0}
          onSearchChange={(v) => {
            setSearch(v);
            changePage(1);
          }}
          onDateSortChange={(v) => {
            setDateSort(v);
            changePage(1);
          }}
          onPriceSortChange={(v) => {
            setPriceSort(v);
            changePage(1);
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

      {/* Cards */}
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
      <Pagination page={page} totalPages={totalPages} onChange={changePage} />

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
