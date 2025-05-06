import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Private = ({children, requiredRoles = []}) => {
    const {user, authToken} = useContext(AuthContext);

    if(!authToken){
        return <Navigate to="/login" />;
    }
                               
    if(requiredRoles && user &&  !requiredRoles.some((role) => role === user.Role)){
        return <Navigate to="/error403" />;
    }

    return children;
}

export default Private;