import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'
import { incrementAsync } from '../counter/counterSlice';
import { fetchPlaces } from './placesAPI';

export interface Place {
    name: string;
    description: string;
}

export interface PlacesState {
    value: Place[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: PlacesState = {
    value: [
        { name: 'Chicago', description: 'The Windy City.' },
        { name: 'New York City', description: 'The Big Apple.' }
    ],
    status: 'idle'
}

export const getPlaces = createAsyncThunk(
    'places/fetchPlaces',
    async () => {
        const response = await fetchPlaces();
        return response;
    }
)

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading';
            })
    }
});

export const selectPlaces = (state: RootState) => state.places.value;

export default placesSlice.reducer;