export const useApi = () => {
  const base = 'http://localhost:3001/wishes';

  const getWishes = async () => {
    const res = await fetch(base);
    return res.json();
  };

  const createWish = async (wish: any) => {
    const res = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wish),
    });
    return res.json();
  };

  const updateWish = async (id: string, wish: any) => {
    const res = await fetch(`${base}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wish),
    });
    return res.json();
  };

  const deleteWish = async (id: string) => {
    await fetch(`${base}/${id}`, { method: 'DELETE' });
  };

  return { getWishes, createWish, updateWish, deleteWish };
};
