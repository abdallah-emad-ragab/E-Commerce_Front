import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utilities";
import type { RootState } from "../../store";

const thunkWishlist = createAsyncThunk("wishlist/thunkWishlist",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const userId = auth.user?.id;
            const isRecordExist = await axios.get(`/wishlist?userId=${userId}&productId=${id}`);

            if (isRecordExist.data.length > 0) {
                await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
                return { type: "removed", id };
            } else {
                await axios.post("/wishlist", { userId, productId: id });
                return { type: "add", id };
            }
        }
        catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default thunkWishlist;