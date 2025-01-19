import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import toast from 'react-hot-toast';

interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}

interface PromoState {
  appliedPromo: PromoCode | null;
  availablePromos: PromoCode[];
}

const initialState: PromoState = {
  appliedPromo: null,
  availablePromos: [
    { code: 'SAVE20', type: 'percentage', value: 20 },
    { code: 'FLAT50', type: 'fixed', value: 50 },
    { code: 'SUMMER10', type: 'percentage', value: 10 },
  ]
};

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    applyPromoCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.toUpperCase();
      const promo = state.availablePromos.find(p => p.code === code);
      
      if (promo) {
        state.appliedPromo = promo;
        toast.success(`Promo code ${code} applied successfully!`);
      } else {
        state.appliedPromo = null;
        toast.error('Invalid promo code');
      }
    },
    removePromoCode: (state) => {
      state.appliedPromo = null;
      toast.success('Promo code removed');
    }
  }
});

export const selectAppliedPromo = (state: RootState) => state.promo.appliedPromo;
export const { applyPromoCode, removePromoCode } = promoSlice.actions;
export default promoSlice.reducer; 