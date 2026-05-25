import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { axiosErrorHandler } from "../../../utilities";
import axiosInstance from "../../../services/axios-global";

const thunkPlaceOrder = createAsyncThunk("orderSlice/thunkPlaceOrder", async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((product) => ({
        id: product.id,
        title: product.title,
        img: product.img,
        price: product.price,
        quantity: cart.items[product.id] // This will give us the quantity of each product in the cart
    }));

    try {
        const response = await axiosInstance.post("/orders", {
            userId: auth.user?.id,
            items: orderItems,
            subtotal
        });
        return response.data;

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkPlaceOrder;