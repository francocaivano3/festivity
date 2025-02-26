import { useState, useEffect } from "react";
import Auth from "../services/auth";
import Sidebar from "./Sidebar";
import {fetchAllEvents} from "../utils/fetch";
import {AlignLeft} from "lucide-react";
import EventCard from "./EventCard";

const Dashboard = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [events, setEvents] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        
        const loadEvents = async() => {
            const data = await fetchAllEvents();
            if(data) setEvents(data);
            console.log("Datos obtenidos:", data);
            console.log(events || "anana");
        };
        loadEvents();

        if(!token) {
            setIsAuth(false);
            return;
        }

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
   <div className="flex-1 min-h-screen bg-gradient-to-r from-violet-200 to-green-200">
        {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={toggleSidebar}
            />
        )}
        <div className="flex p-4"> 
            {isSidebarOpen && <Sidebar />}
            {isSidebarOpen && <button className="z-50" onClick={toggleSidebar}><AlignLeft className="h-8 w-8 hover:scale-110 transition-all" /></button>}
            <button onClick={toggleSidebar}><AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-600"/></button>
            <h1 className={isSidebarOpen ? "text-3xl font-bold text-indigo-600 ml-40" : "text-3xl font-bold text-indigo-600"}>Eventos</h1>
        </div>
        <div className={isSidebarOpen ? "mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 blur-sm min-w-full" : "mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 min-w-full"}>
           {events.length <= 0 ? <h2 className="text-[#6366f1] underline font-bold col-span-full text-center">NO HAY EVENTOS</h2> : events.map(event => <EventCard role={"Invitado"} key={event.id} EventId={event.id} Name={event.name} Address={event.address} City={event.city} Day={event.date} NumberOfTickets={event.numberOfTickets} Category={event.category} Price={event.price}/>)}
        </div>
   </div>)
}

export default Dashboard;