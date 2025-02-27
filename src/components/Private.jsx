import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Private = ({children, requiredRole}) => {
    const {user, authToken} = useContext(AuthContext);

    if(!authToken){
        return <Navigate to="/login" />;
    }
    
    if(requiredRole && user && user.Role !== requiredRole){
        return <Navigate to="/error403" />;
    }

    return children;
}

export default Private;