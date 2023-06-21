import { useSelector } from "react-redux";
import { PageHeader, PageHeaderProps } from "../../shared/page-header/PageHeader"
import { RootState } from "../../../app/store";


export function Admin() {
    const pageHeaderProps: PageHeaderProps = {
        title: 'admin',
        subtitle: 'for admin eyes only...',
        color: 'pink'
    };

    const authState = useSelector((state: RootState) => state.auth);

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            <h2>For admin eyes only.</h2>

            <h3>Authenticated: {authState.value.authenticated ? 'yes' : 'no'}</h3>
            {authState.value.user && <h3>Role: {authState.value.user?.role}</h3>}

            <div>{JSON.stringify(authState.value)}</div>
        </div>
    );
}

