import environment from "../utils/environment";
import {jwtDecode} from "jwt-decode";

const Auth = {
    login: async(body) => {
        let url = `${environment.backendUrl}/api/authentication/authenticate`;

        let options = {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        const response = await fetch(url, options);

        if(!response.ok){
            throw new Error("Failed to authenticate user");
        }

        const token = await response.text();
        if(token){
            localStorage.setItem("authToken", token);
        }

        return {token};
    },
    logout: () => {
        localStorage.removeItem("authToken");
    },
    isTokenExpired: () => {
        const token = localStorage.getItem("authToken");
        if(!token) return true;
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    },
    checkAndRemoveExpiredToken: () => {
        const token = localStorage.getItem("authToken");
        if(Auth.isTokenExpired(token)) {
            Auth.logout();
        }
    }
}

export default Auth;