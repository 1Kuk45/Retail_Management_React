import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orders: Array<any>;
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<{ items: Array<any> }>) => {
      const newOrder = {
        id: Date.now(),
        items: action.payload.items,
        totalAmount: action.payload.items.reduce((total, item) => total + item.totalPrice, 0),
        status: 'pending',
      };
      state.orders.push(newOrder);
    },
  },
});

export const { createOrder } = orderSlice.actions;
export default orderSlice.reducer;
