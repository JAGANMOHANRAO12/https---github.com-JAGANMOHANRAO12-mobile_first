import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import characterReducer from './slices/characterSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        characters: characterReducer
    }
});

export default store;
