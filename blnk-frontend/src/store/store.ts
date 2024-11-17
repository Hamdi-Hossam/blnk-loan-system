import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/slices/userSlice";
import banksReducer from "@/slices/banksSlice";
import columnsReducer from "@/slices/columnsSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
    banks: banksReducer,
    columns: columnsReducer,
    // Add more reducers here as your app grows
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
