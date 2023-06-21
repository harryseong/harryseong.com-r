import { useSelector } from 'react-redux';
import './Home.scss';
import { RootState } from '../../../app/store';
import { PageHeader, PageHeaderProps } from '../../shared/page-header/PageHeader';


export function Home() {
    const pageHeaderProps: PageHeaderProps = {
        title: 'home',
        subtitle: 'welcome home...',
        color: 'yellow'
    };

    const authState = useSelector((state: RootState) => state.auth);

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            <h2>Welcome Home{authState.value.user != null ? ", " + authState.value.user.firstName : ""}!</h2>

            <h3>Authenticated: {authState.value.authenticated ? 'yes' : 'no'}</h3>
            {authState.value.user && <h3>Role: {authState.value.user?.role}</h3>}

            <div>{JSON.stringify(authState.value)}</div>
        </div>
    );
}