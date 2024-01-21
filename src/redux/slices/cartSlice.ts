import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartState {
  items: { id: number; count: number }[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<number>) => {
      state.totalQuantity++;
      if (state.items.some((item) => item.id === action.payload)) {
        state.items = state.items.map((item) => {
          if (item.id === action.payload) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      } else {
        state.items.push({ id: action.payload, count: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const count = state.items.find(
        (item) => item.id === action.payload
      )!.count;
      state.totalQuantity = state.totalQuantity - count;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    completeCheckout: (state) => {
      (state.items = []), (state.totalQuantity = 0);
    },
  },
});

export const { addItemToCart, removeItemFromCart, completeCheckout } =
  cartSlice.actions;
export default cartSlice.reducer;
