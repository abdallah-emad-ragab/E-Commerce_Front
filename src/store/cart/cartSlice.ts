import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/products";
import thunkCart from "./thunk/thunkCart";
import type { TLoading } from "../../types/shared";

interface ICart {
    items: { [key: string]: number };
    productsFullInfo: TProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICart = {
    items: {},
    productsFullInfo: [],
    loading: "idle",
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productId = action.payload;
            if (state.items[productId]) {
                state.items[productId] += 1;
            } else {
                state.items[productId] = 1;
            }
        },
        cartChangeQantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity;
        },
        cartRemoveItem: (state, action) => {
            delete state.items[action.payload];
            state.productsFullInfo = state.productsFullInfo.filter((el) => el.id !== action.payload);
        },
        cartCleanUp: (state) => {
            state.productsFullInfo = [];
            state.items = {};
        }
    },

    extraReducers: (builder) => {
        builder.addCase(thunkCart.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        }).addCase(thunkCart.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productsFullInfo = action.payload;
        }).addCase(thunkCart.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string || "Failed to fetch cart products";
        })
    }
})

export {
    thunkCart,
}
export const { addToCart, cartChangeQantity, cartRemoveItem, cartCleanUp } = cartSlice.actions;
export default cartSlice.reducer;