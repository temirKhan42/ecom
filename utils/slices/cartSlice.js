import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  discountDate: null,
  title: '',
  cost: null,
  price: null,
  discount: null,
  amount: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addData: (state, action) => {
      const data = action.payload;
      return data;
    },
    removeData: (state, action) => {
      return {
        id: null,
        title: '',
        cost: null,
        price: null,
        discount: null,
        discountDate: null,
        amount: null,
      };
    },
  },
});

export const { addData, removeData } = cartSlice.actions;

export default cartSlice.reducer;
