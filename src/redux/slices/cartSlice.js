import { createSlice } from '@reduxjs/toolkit';
import { food_list } from '../../assets/assets';

const initialState = {
  cartItems: {}, // maps itemId (string) -> quantity (number)
  food_list: food_list,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId]) {
        if (state.cartItems[itemId] <= 1) {
          delete state.cartItems[itemId];
        } else {
          state.cartItems[itemId] -= 1;
        }
      }
    },
    clearFromCart: (state, action) => {
      const itemId = action.payload;
      delete state.cartItems[itemId];
    },
  },
});

export const { addToCart, removeFromCart, clearFromCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectFoodList = (state) => state.cart.food_list;

// Helper selector to calculate total amount
export const selectCartTotalAmount = (state) => {
  const cartItems = state.cart.cartItems;
  const foodList = state.cart.food_list;
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = foodList.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  return totalAmount;
};

// Helper selector to calculate total items count
export const selectCartTotalItems = (state) => {
  const cartItems = state.cart.cartItems;
  let totalCount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      totalCount += cartItems[item];
    }
  }
  return totalCount;
};

export default cartSlice.reducer;
