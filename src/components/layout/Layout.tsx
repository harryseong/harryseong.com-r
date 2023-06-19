import { Outlet } from 'react-router-dom';
import { Navbar } from '../shared/navbar/Navbar';


export function Layout() {

    return (
        <div>
            <Navbar />

            <Outlet />
        </div>
    )
}
