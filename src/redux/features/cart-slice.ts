import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import toast from 'react-hot-toast';

type InitialState = {
  items: CartItem[];
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

const initialState: InitialState = {
  items: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, quantity, discountedPrice, imgs } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success('Cart quantity updated');
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity,
          discountedPrice,
          imgs,
        });
        toast.success('Added to cart');
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      toast.error('Item removed from cart');
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
        toast.success('Cart quantity updated');
      }
    },

    removeAllItemsFromCart: (state) => {
      if (state.items.length === 0) {
        toast.error('Cart is already empty');
        return;
      }
      state.items = [];
      toast.success('Cart cleared successfully');
    },
  },
});

export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector(
  [selectCartItems, (state: RootState) => state.promoReducer.appliedPromo],
  (items, appliedPromo) => {
    const subtotal = items.reduce((total, item) => {
      return total + item.discountedPrice * item.quantity;
    }, 0);

    if (!appliedPromo) return subtotal;

    const discount = appliedPromo.type === 'percentage' 
      ? (subtotal * appliedPromo.value) / 100 
      : appliedPromo.value;

    return Math.max(subtotal - discount, 0);
  }
);

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;
export default cart.reducer;
