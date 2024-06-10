import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk('auth/signupUser', async (userData) => {
    const response = await axios.post('/api/auth/signup', userData);
    return response.data;
});

export const signinUser = createAsyncThunk('auth/signinUser', async (userData) => {
    const response = await axios.post('/api/auth/signin', userData);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
