import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export interface AuthState {
    value: {
        user: {
            firstName: string;
            lastName: string;
            photoUrl: string | null;
            phoneNumber: string;
            email: string;
            role: 'user' | 'admin';
            authToken: string;
        } | null;
        authenticated: boolean;
    }
}

const initialState: AuthState = {
    value: {
        user: null,
        authenticated: false
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logon: (state) => {
            state.value.user = {
                firstName: 'Harry',
                lastName: 'Seong',
                photoUrl: null,
                phoneNumber: '+1-952-288-8879',
                email: 'harryseong@gmail.com',
                role: 'user',
                authToken: 'testauthtoken123'
            };
            state.value.authenticated = true;
        },
        logonAdmin: (state) => {
            state.value.user = {
                firstName: 'Lando',
                lastName: 'Norris',
                photoUrl: null,
                phoneNumber: '+1-123-456-7890',
                email: 'landonorris@gmail.com',
                role: 'admin',
                authToken: 'testauthtoken123'
            };
            state.value.authenticated = true;
        },
        logoff: (state) => {
            state.value.user = null;
            state.value.authenticated = false;
        }
    },
    extraReducers: {}
});

export const { logon, logonAdmin, logoff } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.value;

export default authSlice.reducer;
