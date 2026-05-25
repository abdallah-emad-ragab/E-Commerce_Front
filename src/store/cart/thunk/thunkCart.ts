import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import axiosInstance from "../../../services/axios-global";
import type { TProduct } from "../../../types/products";
import { axiosErrorHandler } from "../../../utilities";

type TResponse = TProduct[];

const thunkCart = createAsyncThunk("cart/thunkCart", async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsID = Object.keys(cart.items);
    if (!itemsID.length) {
        return fulfillWithValue([]);
    }
    try {
        // Use `in` filter to fetch multiple ids at once
        const ids = itemsID.join(',');
        const response = await axiosInstance.get<TResponse>(`/products?id=in.(${ids})`);
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkCart;