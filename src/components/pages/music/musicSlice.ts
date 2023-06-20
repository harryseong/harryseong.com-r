import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiService } from "../../../services/api/apiService";


export interface MusicState {
    value: {
        currentlyPlaying: any;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
}

const initialState: MusicState = {
    value: {
        currentlyPlaying: null
    },
    status: 'idle',
    error: ''
}

export const fetchCurrentlyPlayingThunk = createAsyncThunk('music/currentlyPlaying', () => {
    return ApiService.fetchCurrentlyPlaying();
});

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentlyPlayingThunk.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchCurrentlyPlayingThunk.fulfilled, (state, action) => {
            state.value.currentlyPlaying = action.payload.data;
            state.status = 'succeeded';
        });
        builder.addCase(fetchCurrentlyPlayingThunk.rejected, (state, action) => {
            state.value.currentlyPlaying = null;
            state.error = JSON.stringify(action.error.message);
            state.status = 'failed';
        });
    }
});

export default musicSlice.reducer;
