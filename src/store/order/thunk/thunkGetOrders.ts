import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { axiosErrorHandler } from "../../../utilities";
import axiosInstance from "../../../services/axios-global";
import type { TOrderItem } from "../../../types/order";

type TResponse = TOrderItem[];

const thunkGetOrders = createAsyncThunk("orderSlice/thunkGetOrders", async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
        const response = await axiosInstance.get<TResponse>(`/orders?userId=eq.${auth.user?.id}`, { signal });
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetOrders;