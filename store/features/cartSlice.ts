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
      console.log(action.payload);
      state.cartItems = {
        qty: action.payload,
      };
    },
    setQty: (state, action) => {
      console.log(action.payload);
      state.cartItems = {
        qty: action.payload.qty,
      };
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
  (cartItems) => cartItems.qty
);

export const { setQty, setInitialState } = cartSlice.actions;

export default cartSlice.reducer;
