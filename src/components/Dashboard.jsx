import { useState, useEffect } from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Auth from "../services/auth";
import Sidebar from "./Sidebar";
import {Text} from "lucide-react";

const Dashboard = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

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
   <div className="flex-1 min-h-screen bg-white">
        <div className="flex p-4"> 
            {isSidebarOpen && <Sidebar />}
            {isSidebarOpen && <button className="z-50" onClick={toggleSidebar}><Text className="h-8 w-8 hover:scale-110 transition-all" /></button>}
            <button onClick={toggleSidebar}><Text className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-600"/></button>
            <h1 className={isSidebarOpen ? "text-3xl font-bold text-indigo-600 ml-40" : "text-3xl font-bold text-indigo-600"}>Eventos</h1>
        </div>
   </div>)
}

export default Dashboard;