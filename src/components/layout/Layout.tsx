import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';

import { useAppSelector } from '../../app/hooks';
import { selectAppConfig } from '../app-config/AppConfigSlice'


import style from './layout.module.scss';

export function Layout() {
    const darkMode: boolean = useAppSelector(selectAppConfig);

    return (
        <div>
            <Navbar />

            <Outlet />
        </div>
    )
}