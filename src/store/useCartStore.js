import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // UI Actions
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Cart Actions
      addItem: (drink) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === drink.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === drink.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true // Auto open cart on add
            };
          }
          return {
            items: [...state.items, { ...drink, quantity: 1 }],
            isOpen: true
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      // Selectors (computed values)
      getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'freshsip-cart', // unique name for localStorage
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state (isOpen)
    }
  )
);
