import { useSelector } from 'react-redux';
import './Home.scss';
import { RootState } from '../../../app/store';
import { PageHeader, PageHeaderProps } from '../../shared/page-header/PageHeader';
import { Card, CardContent, Typography, Stack } from '@mui/material';


export function Home() {
    const pageHeaderProps: PageHeaderProps = {
        title: 'home',
        subtitle: 'welcome home...',
        color: 'yellow'
    };

    const authState = useSelector((state: RootState) => state.auth);

    const userCard = (
        <Card variant="outlined" sx={{ minWidth: 450, maxWidth: 450, outlineColor: 'white', backgroundColor: 'paleturquoise', color: 'black' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Welcome Home{authState.value.user != null ? ", " + authState.value.user.firstName : ""}!
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <ul>
                        <li><b>Authenticated:</b> {authState.value.authenticated ? 'yes' : 'no'}</li>
                        {authState.value.user && <li><b>User:</b> {authState.value.user?.firstName} {authState.value.user?.lastName}</li>}
                        {authState.value.user && <li><b>Role:</b> {authState.value.user?.role}</li>}
                    </ul>
                </Typography>
                <Typography variant="body2" sx={{ overflowWrap: 'break-word' }}>
                    {JSON.stringify(authState.value)}
                </Typography>
            </CardContent>
        </Card>
    )

    const authCard = (
        <Card variant="outlined" sx={{ minWidth: 450, maxWidth: 450, outlineColor: 'white', backgroundColor: 'peachpuff', color: 'black' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Authenticated Card
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    You can only view this card if you have been <b>authenticated</b>.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro consequatur eos, expedita dolor inventore veniam aliquam omnis suscipit voluptatibus reprehenderit dicta quod impedit sequi distinctio! Deserunt dicta quae inventore? Debitis?
                </Typography>
            </CardContent>
        </Card>
    )

    const adminCard = (
        <Card variant="outlined" sx={{ minWidth: 450, maxWidth: 450, outlineColor: 'white', backgroundColor: 'palegoldenrod', color: 'black' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Admin Card
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    You can only view this card if you are an <b>admin</b>.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro consequatur eos, expedita dolor inventore veniam aliquam omnis suscipit voluptatibus reprehenderit dicta quod impedit sequi distinctio! Deserunt dicta quae inventore? Debitis?
                </Typography>
            </CardContent>
        </Card>
    )

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                {userCard}

                {authState.value.authenticated && authCard}

                {authState.value.user?.role === 'admin' && adminCard}
            </Stack>
        </div>
    );
}