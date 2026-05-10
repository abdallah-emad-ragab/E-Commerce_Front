import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../utilities";
import axios from "axios";

type TFormData = {
    email: string;
    password: string;
}
type TResponse = {
    accessToken: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }
}

const thunkLogin = createAsyncThunk<TResponse, TFormData>("auth/thunkLogin", 
    async (formData: TFormData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post<TResponse>("login", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
)

export default thunkLogin;