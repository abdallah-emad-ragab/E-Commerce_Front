import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
            const userWishlist = await axios.get<{ productId: number }[]>(`wishlist?userId=${auth.user?.id}`, { signal });
            if (!userWishlist.data.length) {
                return {data: [], dataType: "empty"};
            }

            if (dataType === "ProductsIds") {
                const productIds = userWishlist.data.map(item => item.productId);
                return fulfillWithValue({data: productIds, dataType: "ProductsIds"});
            } else {
                const productIds = userWishlist.data.map(item => `id=${item.productId}`).join("&");
                const response = await axios.get<TResponse>(`products?${productIds}`);
                return fulfillWithValue({data: response.data, dataType: "ProductsFullInfo"});
            }
        }

        catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    });

export default thunkLikeToggle;