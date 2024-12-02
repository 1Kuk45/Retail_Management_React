import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  productName: string;
  sellingPrice: number;
  quantity: number;
  totalPrice: number;
  stockQty: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.sellingPrice;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.cartItems.find((item) => item.productId === action.payload.productId);
      if (item) {
        item.quantity += action.payload.quantity;
        if (item.quantity < 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.productId !== action.payload.productId
          );
        } else {
          item.totalPrice = item.quantity * item.sellingPrice;
        }
      }
    }, 
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
