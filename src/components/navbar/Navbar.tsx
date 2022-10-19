import React from 'react';

import styles from './Navbar.module.scss';

import { Link } from 'react-router-dom';

export function Navbar() {

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/places">Places</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                </ul>
            </nav>
        </div>
    )
}