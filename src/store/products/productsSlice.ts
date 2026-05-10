import { createSlice } from "@reduxjs/toolkit";
import thunkProducts from "./thunk/thunkProducts";
import type { TProduct } from "../../types/products";
import type { TLoading } from "../../types/shared";

interface ICategoriesState {
    records: TProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsCleanUp: (state) => {
            state.records = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkProducts.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        }).addCase(thunkProducts.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        }).addCase(thunkProducts.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") state.error = action.payload;
        })
    }
});

export const { productsCleanUp } = productsSlice.actions;
export const { reducer: productsReducer } = productsSlice;
export default productsSlice.reducer;