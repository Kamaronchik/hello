import { createSlice } from '@reduxjs/toolkit';
import { getUsers, saveUser, getUser } from './authSlice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Action to load user's specific cart from DB
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // SAVE TO USER'S PERMANENT RECORD
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.username) {
        const user = getUser(currentUser.username);
        if (user) {
          user.cart = state.items;
          saveUser(user);
        }
      }
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.username) {
        const user = getUser(currentUser.username);
        if (user) {
          user.cart = state.items;
          saveUser(user);
        }
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.username) {
        const user = getUser(currentUser.username);
        if (user) {
          user.cart = state.items;
          saveUser(user);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.username) {
        const user = getUser(currentUser.username);
        if (user) {
          user.cart = [];
          saveUser(user);
        }
      }
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
