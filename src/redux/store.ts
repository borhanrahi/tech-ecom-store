import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import authReducer from "./features/authSlice";
import recentlyViewedReducer from "./features/recentlyViewed-slice";
import promoReducer from './features/promo-slice';
import checkoutReducer from './features/checkout-slice';

// Create a noop storage
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Initialize storage based on environment
const storageSystem = typeof window !== 'undefined'
  ? require('redux-persist/lib/storage').default
  : createNoopStorage();

// Combine all reducers
const rootReducer = combineReducers({
  quickViewReducer,
  cart: cartReducer,
  wishlistReducer,
  productDetailsReducer,
  auth: authReducer,
  recentlyViewedReducer,
  promo: promoReducer,
  checkout: checkoutReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage: storageSystem,
  whitelist: ['cart', 'promo'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
