import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { Product } from "@/types/product";

type InitialState = {
  items: Product[];
};

const initialState: InitialState = {
  items: [],
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addToRecentlyViewed: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        // Add to front of array and limit to 12 items
        state.items.unshift(action.payload);
        if (state.items.length > 12) {
          state.items.pop();
        }
      }
      localStorage.setItem('recentlyViewedItems', JSON.stringify(state.items));
    },
    clearRecentlyViewed: (state) => {
      state.items = [];
      localStorage.removeItem('recentlyViewedItems');
      toast.success('Recently viewed items cleared');
    },
    setRecentlyViewed: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { addToRecentlyViewed, clearRecentlyViewed, setRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer; 