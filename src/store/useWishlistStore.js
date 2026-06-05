import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Actions
      toggleItem: (drink) => {
        const { items } = get();
        const exists = items.some((item) => item.id === drink.id);

        if (exists) {
          set({ items: items.filter((item) => item.id !== drink.id) });
        } else {
          set({ items: [...items, drink] });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      clearWishlist: () => set({ items: [] }),

      // Selectors
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },
      
      getItemCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'freshsip-wishlist',
    }
  )
);
