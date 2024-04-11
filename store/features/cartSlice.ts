import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, inventory } from "interfaces";
import { RootState } from "@/store/store";

export interface CartState {
  cartItems: CartItem[];
}
const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<number>) => {
      state.cartItems = Array(action.payload).fill({
        inventory: 0,
        qty: 0,
      });
    },
    increment: (state, action) => {
      const cartItem = state.cartItems.find(
        (el) => el.inventory === action.payload.inventory
      );
      if (cartItem) cartItem.qty += action.payload.qty;
      else {
        state.cartItems.push({
          inventory: action.payload.inventory,
          qty: action.payload.qty,
        });
      }
    },

    decrement: (state, action) => {
      const cartItem = state.cartItems.find(
        (el) => el.inventory.id === action.payload.id
      );
      if (cartItem) {
        cartItem.qty--;
        if (cartItem.qty === 0) {
          state.cartItems = state.cartItems.filter(
            (el) => el.inventory.id !== action.payload.id
          );
        }
      }
    },
  },
});

const cartItems = (state: RootState) => state.cart.cartItems;

export const inventoryQtyInCartSelector = createSelector(
  [cartItems, (cartItems, inventoryId: number) => inventoryId],
  (cartItems, inventoryId) =>
    cartItems.find((el) => el.inventory.id === inventoryId)?.qty
);

export const totalCartItemsSelector = createSelector(
  [cartItems],
  (cartItems) => cartItems.length
);

export const { increment, decrement, setInitialState } = cartSlice.actions;

export default cartSlice.reducer;
