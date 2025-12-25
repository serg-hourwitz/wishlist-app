import { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from '../api/useApi';
import type {Wish} from '../types/type';


interface WishesContextProps {
  wishes: Wish[];
  refresh: () => void;
  create: (w: Omit<Wish, 'id' | 'createdAt'>) => void;
  update: (id: string, w: Partial<Wish>) => void;
  remove: (id: string) => void;
  loading: boolean;
}

const WishesContext = createContext<WishesContextProps | null>(null);

export const WishesProvider = ({ children }: { children: React.ReactNode }) => {
  const { getWishes, createWish, updateWish, deleteWish } = useApi();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getWishes();
      const normalized = data.map((w: any) => ({
        ...w,
        createdAt:
          typeof w.createdAt === 'number'
            ? w.createdAt
            : new Date(w.createdAt).getTime(),
        id: String(w.id),
      }));
      setWishes(normalized);
    } finally {
      setLoading(false);
    }
  };

  const create = async (wish: Omit<Wish, 'id' | 'createdAt'>) => {
    const newWish = { ...wish, createdAt: Date.now() };
    await createWish(newWish);
    refresh();
  };

  const update = async (id: string, wish: Partial<Wish>) => {
    await updateWish(id, wish);
    refresh();
  };

  const remove = async (id: string) => {
    await deleteWish(id);
    refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <WishesContext.Provider
      value={{ wishes, refresh, create, update, remove, loading }}
    >
      {children}
    </WishesContext.Provider>
  );
};

export const useWishes = () => {
  const ctx = useContext(WishesContext);
  if (!ctx) throw new Error('WishesContext missing');
  return ctx;
};
