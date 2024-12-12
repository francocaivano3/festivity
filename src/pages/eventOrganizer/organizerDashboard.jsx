import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import {Text} from "lucide-react";
import EventCard from "../../components/EventCard";
import { useNavigate } from "react-router-dom";
import environment from "../../utils/environment";
import Wedding from "../../assets/wedding.png";

const OrganizerDashboard = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${environment.backendUrl}/api/Events/organizer/events`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    }
                });

                if(!response.ok){
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setEvents(data);
            } catch (e) {
                console.error("Error while fetching events: ", e);
            };
        }
        fetchEvents();
    }, []);

    console.log(events);

   return (
    <div className="flex-1 min-h-screen bg-gray-50">
         <div className="flex p-4"> 
             {isSidebarOpen && <Sidebar />}
             {isSidebarOpen && <button className="z-50 sticky top-0" onClick={toggleSidebar}><Text className="h-8 w-8 hover:scale-110 transition-all" /></button>}
             <button onClick={toggleSidebar}><Text className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500"/></button>
             <h1 className={isSidebarOpen ? "text-3xl font-bold text-indigo-500 ml-40" : "text-3xl font-bold text-indigo-500"}>Organizer Dashboard</h1>
         </div>
         <div className={isSidebarOpen ? "mx-auto w-fit grid grid-cols-3 gap-12 p-10 blur-sm" : "mx-auto w-fit grid grid-cols-3 gap-12 p-10"}>
            {events.length > 0 ? events.map(event => <EventCard key={event.id} Name={event.name} Address={event.address} City={event.city} Day={event.date} NumberOfTickets={event.numberOfTickets} Category={event.category} Price={event.price}/>) : <h2>No events</h2>}
         </div>
    </div>)
}

export default OrganizerDashboard;