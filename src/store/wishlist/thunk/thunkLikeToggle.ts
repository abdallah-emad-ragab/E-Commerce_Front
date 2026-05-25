import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios-global";
import type { TProduct } from "../../../types/products";
import { axiosErrorHandler } from "../../../utilities";
import type { RootState } from "../../store";

type TResponse = TProduct[];
type TDataType = "ProductsFullInfo" | "ProductsIds";

const thunkLikeToggle = createAsyncThunk("wishlist/thunkLikeToggle",
    async (dataType: TDataType, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            // Request wishlist for current user using PostgREST filter
            const userWishlist = await axiosInstance.get<{ productId: number }[]>(`/wishlist?userId=eq.${auth.user?.id}`, { signal });
            if (!userWishlist.data.length) {
                return {data: [], dataType: "empty"};
            }

            if (dataType === "ProductsIds") {
                const productIds = userWishlist.data.map(item => item.productId);
                return fulfillWithValue({data: productIds, dataType: "ProductsIds"});
            } else {
                // Build an `in` filter for multiple ids: id=in.(1,2,3)
                const ids = userWishlist.data.map(i => i.productId).join(',');
                const response = await axiosInstance.get<TResponse>(`/products?id=in.(${ids})`);
                return fulfillWithValue({data: response.data, dataType: "ProductsFullInfo"});
            }
        }

        catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    });

export default thunkLikeToggle;