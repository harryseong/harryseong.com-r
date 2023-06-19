import { Link } from 'react-router-dom';

import { AppBar, Button, Box, Container, IconButton, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectAppConfig, toggle } from '../app-config/AppConfigSlice'
import { logoff, logon } from '../auth/authSlice';
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button component={Link} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>HARRY SEONG</Button>
                        <Button component={Link} to="/places" sx={{ my: 2, color: 'white', display: 'block' }}>Places</Button>
                        <Button component={Link} to="/counter" sx={{ my: 2, color: 'white', display: 'block' }}>Counter</Button>
                        <Button component={Link} to="/about" sx={{ my: 2, color: 'white', display: 'block' }}>About</Button>

                        {authState.value.authenticated ?
                            <Button onClick={() => dispatch(logoff())} sx={{ my: 2, color: 'white', display: 'block' }}>Logout</Button> :
                            <Button onClick={() => dispatch(logon())} sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
                        }
                    </Box>
                    <IconButton onClick={() => dispatch(toggle())} aria-label="toggle between dark and light mode" size="large">
                        {darkMode ? <FontAwesomeIcon icon={regular('sun')} /> : <FontAwesomeIcon icon={regular('moon')} />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    )
}