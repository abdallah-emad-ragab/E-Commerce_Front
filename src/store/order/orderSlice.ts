import { createSlice } from "@reduxjs/toolkit";
import type { TOrderItem } from "../../types/order";
import type { TLoading } from "../../types/shared";
import thunkPlaceOrder from "./thunk/thunkPlaceOrder";
import thunkGetOrders from "./thunk/thunkGetOrders";

interface IOrderSlice {
    orderList: TOrderItem[];
    loading: TLoading;
    error: string | null;
}

const initialState: IOrderSlice = {
    orderList: [],
    loading: "idle",
    error: null
};

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.loading = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Place Order
        builder.addCase(thunkPlaceOrder.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        }).addCase(thunkPlaceOrder.fulfilled, (state) => {
            state.loading = "succeeded";
        }).addCase(thunkPlaceOrder.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        })

        // Get Orders
        builder.addCase(thunkGetOrders.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        }).addCase(thunkGetOrders.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.orderList = action.payload;
        }).addCase(thunkGetOrders.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        })
    }
})

export { thunkPlaceOrder, thunkGetOrders };
export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;