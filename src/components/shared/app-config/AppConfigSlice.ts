import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface AppConfigState {
    darkMode: boolean
}

const initialState: AppConfigState = {
    darkMode: true
}

export const appConfigSlice = createSlice({
    name: 'app-config',
    initialState,
    reducers: {
        toggle: (state) => {
            state.darkMode = !(state.darkMode);
        }
    }
})

export const { toggle } = appConfigSlice.actions;

export const selectAppConfig = (state: RootState) => state.appConfig.darkMode;

export default appConfigSlice.reducer;