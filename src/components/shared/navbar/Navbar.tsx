import './Navbar.scss';

import { Link } from 'react-router-dom';

import { AppBar, Button, Box, Container, Toolbar } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectAppConfig } from '../app-config/AppConfigSlice'
import { logoff, logon, logonAdmin } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';


export function Navbar() {
    const dispatch = useAppDispatch();

    const darkMode: boolean = useAppSelector(selectAppConfig);
    const authState = useSelector((state: RootState) => state.auth);

    return (
        <AppBar position="static" color={darkMode ? "primary" : "secondary"} sx={{ transition: '0.3s' }} className={darkMode ? 'dark' : 'light'}>
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <Button component={Link} to="/" sx={{ my: 1, color: 'white', display: 'block' }}>HARRY SEONG</Button>
                        <Button component={Link} to="/places" sx={{ my: 1, color: 'white', display: 'block' }}>Places</Button>
                        <Button component={Link} to="/music" sx={{ my: 1, color: 'white', display: 'block' }}>Music</Button>
                        <Button component={Link} to="/authenticated" sx={{ my: 1, color: 'white', display: 'block' }}>Authenticated</Button>
                        <Button component={Link} to="/admin" sx={{ my: 1, color: 'white', display: 'block' }}>Admin</Button>
                    </Box>
                    {authState.value.authenticated ?
                        <Button onClick={() => dispatch(logoff())} sx={{ my: 1, color: 'white', display: 'block' }}>Logout</Button> :
                        <>
                            <Button onClick={() => dispatch(logon())} sx={{ my: 1, color: 'white', display: 'block' }}>Login</Button>
                            <Button onClick={() => dispatch(logonAdmin())} sx={{ my: 1, color: 'white', display: 'block' }}>Login (admin)</Button>
                        </>
                    }
                    {/* <IconButton onClick={() => dispatch(toggle())} aria-label="toggle between dark and light mode" size="large">
                        {darkMode ? <FontAwesomeIcon icon={regular('sun')} /> : <FontAwesomeIcon icon={regular('moon')} />}
                    </IconButton> */}
                </Toolbar>
            </Container>
        </AppBar>
    )
}