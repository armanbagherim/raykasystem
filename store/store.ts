import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "./features/cartSlice";
import { fetchAndSetInitialState } from "./fetchAndSetInitialState";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

store.dispatch(fetchAndSetInitialState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
