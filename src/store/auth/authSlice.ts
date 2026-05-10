import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/shared";
import thunkRegister from "./thunk/thunkRegister";
import thunkLogin from "./thunk/thunkLogin";

interface IAuthState {
    user?: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    accessToken?: string | null;
    loading: TLoading;
    error: string | null;
}

const initialState: IAuthState = {
    user: null,
    accessToken: null,
    loading: "idle",
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUI: (state) => {
            state.loading = "idle";
            state.error = null;
        },
        authLogout: (state) => {
            state.user = null;
            state.accessToken = null;
        }
    },

    extraReducers: (builder) => {
        // Register
        builder.addCase(thunkRegister.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(thunkRegister.fulfilled, (state) => {
            state.loading = "succeeded";
            state.error = null;
        })
        builder.addCase(thunkRegister.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        })

        // Login
        builder.addCase(thunkLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(thunkLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.error = null;
        })
        builder.addCase(thunkLogin.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        })
    }
})

export { thunkRegister, thunkLogin };
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;