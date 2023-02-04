import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  items: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem: (state, action) => {
      const { id, title, price, quantity } = action.payload;

      // if item already exits in cart
      const itemExists = state.items.find((item) => item.id === id);
      const remainingItems = state.items.filter((item) => item.id !== id);

      if (itemExists) {
        state.items = [
          ...remainingItems,
          {
            id,
            quantity: itemExists.quantity + 1,
            title,
            price,
          },
        ];
      } else {
        state.items = [
          ...state.items,
          {
            id,
            quantity: 1,
            title,
            price,
          },
        ];
      }
    },
    removeItem: (state, action) => {
      const { id, quantity } = action.payload;

      // if quantiy is greater than 1: reduce quantity by 1
      if (quantity > 1) {
        const itemExists = state.items.find((item) => item.id === id);
        const remainingItems = state.items.filter((item) => item.id !== id);

        state.items = [
          ...remainingItems,
          {
            id,
            quantity: itemExists.quantity - 1,
            title: itemExists.title,
            price: itemExists.price,
          },
        ];
      } else {
        // if quantity is 1: remove item from cart
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.cartTotal = 0;
    },
  },
});

export const { addItem, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
