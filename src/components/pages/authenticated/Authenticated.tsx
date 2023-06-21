import { useSelector } from "react-redux";
import { PageHeader, PageHeaderProps } from "../../shared/page-header/PageHeader"
import { RootState } from "../../../app/store";


export function Authenticated() {
    const pageHeaderProps: PageHeaderProps = {
        title: 'authenticated',
        subtitle: 'must be authenticated to see this page...',
        color: 'pink'
    };

    const authState = useSelector((state: RootState) => state.auth);

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            <h2>For authenticated users only.</h2>

            <h3>Authenticated: {authState.value.authenticated ? 'yes' : 'no'}</h3>
            {authState.value.user && <h3>Role: {authState.value.user?.role}</h3>}

            <div>{JSON.stringify(authState.value)}</div>
        </div>
    );
}

