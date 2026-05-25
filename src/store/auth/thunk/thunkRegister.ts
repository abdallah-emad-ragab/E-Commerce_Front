import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../utilities";
import supabase from "../../../services/supabase";

type TFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const thunkRegister = createAsyncThunk("auth/thunkRegister",
    async (formDate: TFormData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            // Use Supabase auth sign up. Pass metadata in the second parameter to ensure compatibility.
            const { data, error } = await supabase.auth.signUp({
                email: formDate.email,
                password: formDate.password,
                options: { data: { firstName: formDate.firstName, lastName: formDate.lastName } }
            });
            if (error) return rejectWithValue(error.message);

            // If a user was created, insert a profile row into `users` table (if your DB uses it)
            // Supabase auth creates an auth user but often apps keep extra profile data in a separate table.
            if (data?.user?.id) {
                try {
                    await supabase.from('users').insert([{ id: data.user.id, email: formDate.email, firstName: formDate.firstName, lastName: formDate.lastName }]);
                } catch (e) {
                    // ignore profile insert errors; registration itself succeeded
                    console.warn('Failed to insert users profile', e);
                }
            }

            // If the signup did not create a user (email confirmation required), return a flag
            if (!data?.user) {
                return { requiresConfirmation: true } as any;
            }

            return { requiresConfirmation: false, user: data.user } as any;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
)

export default thunkRegister;