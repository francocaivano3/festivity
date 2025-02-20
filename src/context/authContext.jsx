import React, {createContext, useContext, useEffect, useState} from 'react';
import Auth from "../services/auth";
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

    useEffect(() => {
        if(authToken){
            setUser(jwtDecode(authToken));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, authToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}