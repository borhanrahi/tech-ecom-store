import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import authReducer from "./features/authSlice";
import recentlyViewedReducer from "./features/recentlyViewed-slice";
import promoReducer from './features/promo-slice';

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

const storage = typeof window !== 'undefined'
  ? require('redux-persist/lib/storage').default
  : createNoopStorage();

// Combine all reducers
const rootReducer = combineReducers({
  quickViewReducer,
  cartReducer,
  wishlistReducer,
  productDetailsReducer,
  auth: authReducer,
  recentlyViewedReducer,
  promoReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['wishlistReducer', 'cartReducer', 'promoReducer'], // Added promoReducer
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
