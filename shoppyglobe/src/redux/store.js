import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/cartSlice';
import searchReducer from './Slices/searchSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});
