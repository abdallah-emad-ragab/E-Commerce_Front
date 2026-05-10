import { createSlice } from "@reduxjs/toolkit";
import thunkWishlist from "./thunk/thunkWishlist";
import thunkLikeToggle from "./thunk/thunkLikeToggle";
import type { TProduct } from "../../types/products";
import type { TLoading } from "../../types/shared";
import { authLogout } from "../auth/authSlice";

interface IWishlistState {
    itemsId: number[];
    error: string | null;
    productsFullInfo: TProduct[];
    isLoading: TLoading;
}

const initialState: IWishlistState = {
    itemsId: [],
    error: null,
    productsFullInfo: [],
    isLoading: "idle"
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        productsWishlistCleanUp: (state) => {
            state.productsFullInfo = [];
        }
    },
    extraReducers: (builder) => {
        // thunkWishlist
        builder.addCase(thunkWishlist.pending, (state) => {
            state.error = null;
        })
        builder.addCase(thunkWishlist.fulfilled, (state, action) => {
            if (action.payload.type === "add") {
                state.itemsId.push(action.payload.id);
            } else {
                state.itemsId = state.itemsId.filter(id => id !== action.payload.id);
                state.productsFullInfo = state.productsFullInfo.filter(product => product.id !== action.payload.id);
            }
        })
        builder.addCase(thunkWishlist.rejected, (state, action) => {
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        })
        // thunkLikeToggle
        builder.addCase(thunkLikeToggle.pending, (state) => {
            state.isLoading = "pending";
            state.error = null;
        })
        builder.addCase(thunkLikeToggle.fulfilled, (state, action) => {
            state.isLoading = "succeeded";
            if (action.payload.dataType === "ProductsFullInfo") {
                state.productsFullInfo = action.payload.data as TProduct[];
            } else {
                state.itemsId = action.payload.data as number[];
            }
        });
        builder.addCase(thunkLikeToggle.rejected, (state, action) => {
            state.isLoading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        })

        // When logout : Resets, Note the way we wrote it
        builder.addCase(authLogout, (state) => {
            state.itemsId = [];
            state.productsFullInfo = [];
        })
    }
});

export { thunkWishlist, thunkLikeToggle }
export const { productsWishlistCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;