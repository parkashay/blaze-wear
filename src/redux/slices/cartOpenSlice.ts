import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

export const cartOpenSlice = createSlice({
    name: "cartOpen",
    initialState,
    reducers: {
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openCart, closeCart } = cartOpenSlice.actions;
export default cartOpenSlice.reducer;