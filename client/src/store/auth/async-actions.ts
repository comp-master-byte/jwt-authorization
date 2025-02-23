import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "./AuthService";
import axios from "axios";
import {BASE_URL} from "../../http";
import {AuthResponse} from "../../models/response/AuthResponse";
import {setLoading} from "./authSlice";
import {ThunkError} from "../types";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: {email: string; password: string}, thunkAPI) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (err: unknown) {
            const error = err as ThunkError;
            throw thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const registration = createAsyncThunk(
    'auth/registration',
    async ({email, password}: {email: string; password: string}, thunkAPI) => {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (err: unknown) {
            const error = err as ThunkError;
            throw thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            return response.data;
        } catch (err: unknown) {
          const error = err as ThunkError;
          throw thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const checkAuthorization = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch(err: unknown) {
      const error = err as ThunkError;
      throw thunkAPI.rejectWithValue(error.response.data.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
)