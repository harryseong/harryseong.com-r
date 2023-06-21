import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = (props: { children: any; }) => {
    const authState = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        if (!authState.value.authenticated) {
            alert('You cannot visit this page, because you are not authenticated. Routing back home.');
            return navigate('/');
        }

    }, [authState, navigate]);

    return authState.value.authenticated ? props.children : null;
}

export default ProtectedRoute;
