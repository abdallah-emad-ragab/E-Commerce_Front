import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import axios from "axios";
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
        const query = itemsID.map((id) => `id=${id}`).join("&");
        const response = await axios.get<TResponse>(`products?${query}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkCart;