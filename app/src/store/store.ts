import { configureStore } from '@reduxjs/toolkit';

// import {} from "@store/airAtomics"
import roomReducer from '@/store/roomReducer';

export const store = configureStore({
  reducer: {
    roomReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
