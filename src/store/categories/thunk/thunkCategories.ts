import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TCategory } from "../../../types/category";
import { axiosErrorHandler } from "../../../utilities";

type TResponse = TCategory[];

const thunkCategories = createAsyncThunk("categories/thunkCategories", async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
        const response = await axios.get<TResponse>("/categories", { signal });
        // Using signal to cancel the request if the component unmounts before the request completes
        return response.data;
    }
    catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
})

export default thunkCategories;