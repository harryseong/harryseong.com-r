import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
    value: {
        user: {
            firstName: string;
            lastName: string;
            photoUrl: string | null;
            phoneNumber: string;
            email: string;
            role: 'user' | 'admin';
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
                role: 'admin'
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

export const { logon, logoff } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.value;

export default authSlice.reducer;
