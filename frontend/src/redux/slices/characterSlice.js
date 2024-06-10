import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async (page) => {
    const response = await axios.get(`https://swapi.dev/api/people?page=${page}`);
    return response.data;
});

const characterSlice = createSlice({
    name: 'characters',
    initialState: {
        characters: [],
        next: null,
        previous: null,
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.characters = action.payload.results;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default characterSlice.reducer;
