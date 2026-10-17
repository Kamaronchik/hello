import { createSlice } from '@reduxjs/toolkit';

// Helper functions to simulate a DB in localStorage
export const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');

export const saveUser = (user) => {
  const users = getUsers();
  const index = users.findIndex(u => u.username === user.username);
  if (index !== -1) {
    users[index] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUser = (username) => {
  const users = getUsers();
  return users.find(u => u.username === username);
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    userCart: [], // Store the cart here to link it to the user
  },
  reducers: {
    register: (state, action) => {
      const { username, password } = action.payload;
      const trimmedUsername = username.trim();
      const users = getUsers();

      if (!trimmedUsername || !password) {
        throw new Error('Имя пользователя и пароль не могут быть пустыми');
      }

      if (users.find(u => u.username === trimmedUsername)) {
        throw new Error('User already exists');
      }

      // Initial DB entry with empty cart
      saveUser({ username: trimmedUsername, password, cart: [] });
      return state;
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const trimmedUsername = username.trim();
      const users = getUsers();
      const user = users.find(u => u.username === trimmedUsername && u.password === password);

      if (user) {
        state.user = { username: user.username };
        state.isLoggedIn = true;
        state.userCart = user.cart || []; // CRITICAL: Load cart from "DB" immediately on login

        // We also keep a simple session marker for the cartSlice to find
        localStorage.setItem('currentUser', JSON.stringify({ username: user.username }));
      } else {
        throw new Error('Invalid username or password');
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.userCart = [];
      localStorage.removeItem('currentUser');
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
