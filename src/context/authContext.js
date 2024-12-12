import React, {createContext, useContext, useState} from 'react';
import Auth from "../services/auth";

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    const handleLogin = async (email, password) => {
        const body = {email, password};

        try {
            const response = await Auth.login(body);

            if(response.token !== "error") {
                setUser({email});
                setAuthToken(response.token);
                localStorage.setItem('authToken', response.token);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (e) {
            console.error("Error while login: ", e);
            alert("Failed to login, please check your credentials");
        };
    }

    const handleLogout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, authToken, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}