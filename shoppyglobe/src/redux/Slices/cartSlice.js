import { createSlice, createSelector } from '@reduxjs/toolkit';

// List of products in the cart
const initialState = {
  cartItems: [],  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    //add to cart
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    // remove from cart 
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    //update quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    // empty cart 
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Selector for total price
export const selectCartTotal = createSelector(
  (state) => state.cart.cartItems,
  (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
