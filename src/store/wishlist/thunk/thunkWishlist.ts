import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios-global";
import { axiosErrorHandler } from "../../../utilities";
import type { RootState } from "../../store";

const thunkWishlist = createAsyncThunk("wishlist/thunkWishlist",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const userId = auth.user?.id;
            // Use PostgREST filters
            const isRecordExist = await axiosInstance.get(`/wishlist?userId=eq.${userId}&productId=eq.${id}`);

            if (isRecordExist.data.length > 0) {
                await axiosInstance.delete(`/wishlist/${isRecordExist.data[0].id}`);
                return { type: "removed", id };
            } else {
                await axiosInstance.post("/wishlist", { userId, productId: id });
                return { type: "add", id };
            }
        }
        catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default thunkWishlist;