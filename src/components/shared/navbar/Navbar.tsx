import './Navbar.scss';

import { Link, useNavigate } from 'react-router-dom';

import { AppBar, Button, Box, Container, Toolbar, Avatar, Menu, MenuItem, Typography } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectAppConfig } from '../app-config/AppConfigSlice'
import { logoff, logon, logonAdmin } from '../../../utils/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import React from 'react';


export function Navbar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const darkMode: boolean = useAppSelector(selectAppConfig);
    const authState = useSelector((state: RootState) => state.auth);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogOff = () => {
        navigate('/');
        dispatch(logoff());
    }

    return (
        <AppBar position="static" color={darkMode ? "primary" : "secondary"} sx={{ bgcolor: 'black', transition: '0.3s' }} className={darkMode ? 'dark' : 'light'}>
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <Button component={Link} to="/" sx={{ my: 1, color: 'white', display: 'block' }}>HARRY SEONG</Button>
                        <Button component={Link} to="/places" sx={{ my: 1, color: 'white', display: 'block' }}>Places</Button>
                        <Button component={Link} to="/music" sx={{ my: 1, color: 'white', display: 'block' }}>Music</Button>
                        <Button component={Link} to="/authenticated" sx={{ my: 1, color: 'white', display: 'block' }}>Authenticated</Button>
                        <Button component={Link} to="/admin" sx={{ my: 1, color: 'white', display: 'block' }}>Admin</Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                        {authState.value.authenticated ?
                            <>
                                <Button variant='outlined' sx={{ display: 'flex', flexDirection: 'row', gap: 1, color: 'white', borderColor: 'white' }}
                                    onClick={handleOpenUserMenu}>
                                    <Avatar alt="avatar" src={`/${authState.value.user?.firstName}.jpg`} />
                                    {authState.value.user?.firstName} {authState.value.user?.lastName} ({authState.value.user?.role})
                                </Button>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        handleLogOff();
                                    }}>
                                        <Typography textAlign="center">Log Out</Typography>
                                    </MenuItem>
                                </Menu>
                            </> :
                            <>
                                <Button variant='outlined' onClick={() => dispatch(logon())} sx={{ my: 1, color: 'white', borderColor: 'white', display: 'block' }}>Login</Button>
                                <Button variant='outlined' onClick={() => dispatch(logonAdmin())} sx={{ my: 1, color: 'white', borderColor: 'white', display: 'block' }}>Login (admin)</Button>
                            </>
                        }
                        {/* <IconButton onClick={() => dispatch(toggle())} aria-label="toggle between dark and light mode" size="large">
                        {darkMode ? <FontAwesomeIcon icon={regular('sun')} /> : <FontAwesomeIcon icon={regular('moon')} />}
                    </IconButton> */}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}