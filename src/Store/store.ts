import { configureStore } from "@reduxjs/toolkit";
import productSlicer from "./Slicers/Product/product.slicer";

export const store = configureStore({
  reducer: {
    product: productSlicer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
