import { useState, useEffect } from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Auth from "../services/auth";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [isAuth, setIsAuth] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(Auth.isTokenExpired(token)){
            setIsAuth(false);
            Auth.checkAndRemoveExpiredToken();
        }
    }, []);

    const handleLogout = () => {
        Auth.logout();
        setIsAuth(false);
    }

   return (
   <div className="flex min-h-screen">
    <sidebar className="w-64">
        <Sidebar/>
    </sidebar>
    {/* /*indigo 800 para modo oscuro*/  }
    <div className="flex-1 p-8 bg-indigo-600"> 
        <h1 className="text-3xl font-bold text-white">Eventos</h1>
    </div>
   </div>)
}

export default Dashboard;