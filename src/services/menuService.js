import { menuData as initialMenu } from '../data/menu';

const STORAGE_KEY = 'freshsip_menu_v2';

const getMenuData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Seed the database if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMenu));
    return initialMenu;
  } catch (err) {
    return initialMenu;
  }
};

const saveMenuData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const menuService = {
  getAllDrinks: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getMenuData();
  },

  updateDrink: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = getMenuData();
    const index = data.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Drink not found');
    
    data[index] = { ...data[index], ...updates };
    saveMenuData(data);
    return data[index];
  },

  deleteDrink: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = getMenuData();
    const filtered = data.filter(d => d.id !== id);
    saveMenuData(filtered);
    return true;
  },

  addDrink: async (drink) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = getMenuData();
    const newDrink = {
      ...drink,
      id: "drink_" + Math.random().toString(36).substr(2, 9),
    };
    data.push(newDrink);
    saveMenuData(data);
    return newDrink;
  }
};
