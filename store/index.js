import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../utils/slices/cartSlice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;