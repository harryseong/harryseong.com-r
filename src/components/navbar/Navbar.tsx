import React from 'react';
import { AppBar, Button, Box, Container, Toolbar, Typography, } from '@mui/material';

import styles from './Navbar.module.scss';

import { Link } from 'react-router-dom';

export function Navbar() {

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography>LOGO</Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button component={Link} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
                        <Button component={Link} to="/places" sx={{ my: 2, color: 'white', display: 'block' }}>Places</Button>
                        <Button component={Link} to="/about" sx={{ my: 2, color: 'white', display: 'block' }}>About</Button>
                        <Button component={Link} to="/counter" sx={{ my: 2, color: 'white', display: 'block' }}>Counter</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        // <div>
        //     <nav>
        //         <ul>
        //             <li><Link to="/">Home</Link></li>
        //             <li><Link to="/places">Places</Link></li>
        //             <li><Link to="/about">About</Link></li>
        //             <li><Link to="/counter">Counter</Link></li>
        //         </ul>
        //     </nav>
        // </div>
    )
}