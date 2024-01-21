import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import cartOpenReducer from "./slices/cartOpenSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartOpen: cartOpenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
