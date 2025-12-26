const BASE_URL = 'https://wishlist-app-7dfd.onrender.com/wishes';

export const useApi = () => {
  const getWishes = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  };

  const createWish = async (wish: any) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wish),
    });
    return res.json();
  };

  const updateWish = async (id: string, wish: any) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wish),
    });
    return res.json();
  };

  const deleteWish = async (id: string) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  };

  return { getWishes, createWish, updateWish, deleteWish };
};
