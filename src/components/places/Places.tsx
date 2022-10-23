import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getPlaces, selectPlaces } from './placesSlice';
import { Button } from '@mui/material'

import styles from './Places.module.scss';

import { selectAppConfig, toggle } from '../app-config/AppConfigSlice'


export function Places() {
    const places = useAppSelector(selectPlaces)
    const darkMode: boolean = useAppSelector(selectAppConfig);
    const dispatch = useAppDispatch();

    return (
        <div className={darkMode ? 'dark' : 'light'}>
            <h1>This is places...</h1>
            <Button onClick={() => dispatch(toggle())} sx={{ my: 2, display: 'block' }}>
                Change to {darkMode ? 'light' : 'dark'} mode
            </Button>
        </div>
    );
}