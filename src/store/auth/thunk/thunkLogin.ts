import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../utilities";
import supabase from "../../../services/supabase";

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
            // Use Supabase auth API instead of posting to a non-existing `login` table
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) {
                // Log full error for debugging
                console.error('Supabase signIn error:', error);
                // Provide clearer message for common auth failures
                if ((error as any)?.status === 400 || (error as any)?.message?.toLowerCase().includes('invalid')) {
                    return rejectWithValue('Invalid email or password. If you just registered, please confirm your email before logging in.');
                }
                return rejectWithValue(error.message || JSON.stringify(error));
            }
            // Normalize response to expected shape in app
            return { accessToken: data?.session?.access_token || '', user: data?.user } as any;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
)

export default thunkLogin;