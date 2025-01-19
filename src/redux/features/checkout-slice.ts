import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type ShippingMethod = {
  id: string;
  label: string;
  price: number;
};

type CheckoutState = {
  shippingMethod: ShippingMethod;
};

const initialState: CheckoutState = {
  shippingMethod: {
    id: 'free',
    label: 'Free Shipping',
    price: 0
  }
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingMethod: (state, action: PayloadAction<ShippingMethod>) => {
      state.shippingMethod = action.payload;
    }
  }
});

// Action creators
export const { setShippingMethod } = checkoutSlice.actions;

// Selectors
export const selectShippingMethod = (state: RootState) => state.checkout.shippingMethod;

export default checkoutSlice.reducer; 