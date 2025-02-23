import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/User";
import {checkAuthorization, login, logout, registration} from "./async-actions";

type AuthSliceState = {
    user: User | undefined;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: AuthSliceState = {
    user: undefined,
    isAuth: false,
    isLoading: false,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth-slice',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log('success')
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(registration.rejected, (state, action) => {
              state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuth = false;
                state.user = undefined;
            })
            .addCase(logout.rejected, (state, action) => {
              state.error = action.payload as string;
            })
            .addCase(checkAuthorization.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(checkAuthorization.rejected, (state, action) => {
              state.error = action.payload as string;
            })
    }
})

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;