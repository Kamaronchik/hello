import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import { getUser } from '../slices/authSlice';
import { setCart } from '../slices/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const storageEngine = storage.default || storage;

const persistConfig = {
  key: 'root',
  storage: storageEngine,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// CUSTOM MIDDLEWARE: This catches the login dispatch and loads the user's cart
const persistenceMiddleware = store => next => action => {
  if (action.type === 'auth/login') {
    const { username } = action.payload;
    const user = getUser(username);
    if (user && user.cart) {
      // Immediately load the user's specific cart from the "DB" into Redux
      store.dispatch(setCart(user.cart));
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(persistenceMiddleware), // Add our auto-sync middleware here
});

export const persistor = persistStore(store);
