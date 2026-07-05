import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishListItems: [], // array of food item IDs (strings)
};

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishList: (state, action) => {
      const itemId = action.payload;
      const index = state.wishListItems.indexOf(itemId);
      if (index === -1) {
        state.wishListItems.push(itemId);
      } else {
        state.wishListItems.splice(index, 1);
      }
    },
  },
});

export const { toggleWishList } = wishListSlice.actions;

// Selector
export const selectWishListItems = (state) => state.wishlist.wishListItems;

export default wishListSlice.reducer;
