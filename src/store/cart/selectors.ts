import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const getCartTotalQuantity = createSelector((state: RootState) => state.cart.items, (items) => {
    return Object.values(items).reduce((acc, current) => acc + current, 0);
})

export { getCartTotalQuantity };