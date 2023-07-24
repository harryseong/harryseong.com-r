import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRouteAdmin = (props: { children: any; }) => {
    const authState = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        if (!authState.value.authenticated || authState.value.user?.role !== 'admin') {
            alert('You cannot visit this page, because you are not an administrator. Routing back home.');
            return navigate('/');
        }

    }, [authState, navigate]);

    return authState.value.authenticated && authState.value.user?.role === 'admin' ? props.children : null;
}

export default ProtectedRouteAdmin;
