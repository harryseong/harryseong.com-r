import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LocalStorageService } from '../../services/local-storage/localStorageService';
import { ApiService } from '../../services/api/apiService';


// Define Place structure
export interface Years {
    start: number;
    end: number;
}
export interface Coords {
    lat: number;
    lng: number;
}
export interface Place {
    place_id: number;
    order: number;
    displayName: string;
    fullName: string;
    description: string;
    years: Years;
    coords: Coords;
}

// Define PlacesState structure
export interface PlacesState {
    value: {
        mapbox: {
            style: string,
            lng: number,
            lat: number,
            zoom: number,
            interactive: boolean
        }
        places: Place[],
        selectedPlace: Place | null
    }
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string
}

// Define PlacesState initial state (if any)
const seoulCoords: Coords = { lng: 126.97, lat: 37.56 };
const initialState: PlacesState = {
    value: {
        mapbox: {
            style: 'mapbox://styles/mapbox/dark-v9?optimize=true',
            lng: seoulCoords.lng,
            lat: seoulCoords.lat,
            zoom: 10,
            interactive: false
        },
        places: [],
        selectedPlace: null
    },
    status: 'idle',
    error: ''
}

// Define getPlaces thunk.
export const fetchPlacesThunk = createAsyncThunk('places/fetchPlaces', () => {
    return ApiService.fetchPlaces();
});

// Leverage the RTK createSlice function.
export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<Place[]>) => {
            state.value.places = action.payload;
            state.status = 'succeeded';
        },
        selectPlace: (state, action: PayloadAction<number>) => {
            const places = (state.value.places == null) ? null : state.value.places;
            const selectedPlace = (places == null) ? null : places.find(place => place.place_id === action.payload);
            state.value.selectedPlace = (selectedPlace == null) ? null : selectedPlace;
        },
        selectPreviousPlace: (state) => {
            if (state.value.selectedPlace != null) {
                const selectedPlaceIndex = state.value.selectedPlace?.order - 1;

                if (selectedPlaceIndex > 0) {
                    state.value.selectedPlace = state.value.places[selectedPlaceIndex - 1];
                }
            }
        },
        selectNextPlace: (state) => {
            if (state.value.selectedPlace != null) {
                const selectedPlaceIndex = state.value.selectedPlace?.order - 1;
                const placesCount = state.value.places.length;

                if (selectedPlaceIndex < placesCount - 1) {
                    state.value.selectedPlace = state.value.places[selectedPlaceIndex + 1];
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlacesThunk.pending, state => {
            state.status = 'loading';
        })
        builder.addCase(fetchPlacesThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const places = action.payload.data.sort((a: Place, b: Place) => a.order - b.order);
            state.value.places = places;
            state.value.selectedPlace = state.value.places[0];
            state.error = '';
            LocalStorageService.setPlaces(places);
        })
        builder.addCase(fetchPlacesThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.value.places = [];
            state.error = JSON.stringify(action.error.message);
        })
    }
});

// Action creators are generated for each case reducer function
export const { setPlaces, selectPlace, selectPreviousPlace, selectNextPlace } = placesSlice.actions;

// Export the placesSlice reducer
export default placesSlice.reducer;
