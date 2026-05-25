import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios-global";
import type { TProduct } from "../../../types/products";
import { axiosErrorHandler } from "../../../utilities";

type TResponse = TProduct[];

const thunkProducts = createAsyncThunk<TResponse, string>(
    "products/thunkProducts",
    async (prefix, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            // Use PostgREST filter syntax: eq.<value>
            const response = await axiosInstance.get<TResponse>(
                `/products?cat_prefix=eq.${encodeURIComponent(prefix)}`,
                { signal }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default thunkProducts;