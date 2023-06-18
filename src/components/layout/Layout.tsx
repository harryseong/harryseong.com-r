import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';


export function Layout() {

    return (
        <div>
            <Navbar />

            <Outlet />
        </div>
    )
}
