import { createSlice } from "@reduxjs/toolkit";
import thunkCategories from "./thunk/thunkCategories";
import type { TCategory } from "../../types/category";
import type { TLoading } from "../../types/shared";

interface ICategoriesState {
    records: TCategory[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoriesCleanUp: (state) => {
            state.records = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        }).addCase(thunkCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        }).addCase(thunkCategories.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") state.error = action.payload;
        })
    }
});

export const { reducer: categoriesReducer } = categoriesSlice;
export const { categoriesCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;