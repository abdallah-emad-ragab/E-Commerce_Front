import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "../../../types/products";
import { axiosErrorHandler } from "../../../utilities";

type TResponse = TProduct[];

const thunkProducts = createAsyncThunk<TResponse, string>(
    "products/thunkProducts",
    async (prefix, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const response = await axios.get<TResponse>(
                `/products?cat_prefix=${prefix}`, 
                { signal }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default thunkProducts;