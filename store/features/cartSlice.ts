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

    // decrement: (state, action) => {
    //   const cartItem = state.cartItems.find(
    //     (el) => el.inventory.id === action.payload.id
    //   );
    //   if (cartItem) {
    //     cartItem.qty--;
    //     if (cartItem.qty === 0) {
    //       state.cartItems = state.cartItems.filter(
    //         (el) => el.inventory.id !== action.payload.id
    //       );
    //     }
    //   }
    // },
  },
});

const cartItems = (state: RootState) => state.cart.cartItems;

export const inventoryQtyInCartSelector = createSelector(
  [cartItems, (cartItems, inventoryId: number) => inventoryId],
  (cartItems, inventoryId) =>
    cartItems.find((el) => el.inventory.id === inventoryId)?.qty
);

export const totalCartItemsSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total: number, curr: CartItem) => (total += curr.qty), 0)
);
export const TotalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, curr: CartItem) =>
      (total += curr.qty * curr.inventory.price),
    0
  )
);

export const { increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
