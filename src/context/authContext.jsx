import React, {createContext, useContext, useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(null);
    console.log(authToken)
    useEffect(() => {
        if (authToken) {
          setUser(jwtDecode(authToken));
        } 
      }, []); 

      console.log(user);
    return (
        <AuthContext.Provider value={{ user, authToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}