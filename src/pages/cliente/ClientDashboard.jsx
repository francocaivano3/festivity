import Sidebar from "../../components/Sidebar"
import { useEffect, useState } from "react";
import { AlignLeft } from "lucide-react";
import { fetchAllEvents } from "../../utils/fetch";
import EventCard from "../../components/EventCard";
const ClientDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [events, setEvents] = useState([]);
    
    const toggleSidebar = () => {
        if(!isSidebarOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if(isSidebarOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        const loadEvents = async() => {
            const data = await fetchAllEvents();
            if(data) setEvents(data);
        };
        loadEvents();
    }, []);

    return (
        <div className="flex-1 min-h-screen bg-gray-50">
            {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={toggleSidebar}
            />
          )}
             <div className="flex p-4"> 
                 {isSidebarOpen && <Sidebar />}
                 {isSidebarOpen && <button className="z-50 sticky top-0" onClick={toggleSidebar}><AlignLeft className="h-8 w-8 hover:scale-110 transition-all" /></button>}
                 <button onClick={toggleSidebar}><AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500"/></button>
                 <h1 className={isSidebarOpen ? "text-3xl font-bold text-indigo-500 ml-40" : "text-3xl font-bold text-indigo-500"}>Eventos</h1>
             </div>
             <div className={isSidebarOpen ? "mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 blur-sm min-w-full" : "mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 min-w-full"}>
                {events.length > 0 ? events.map(event => <EventCard role={"Client"} key={event.id} EventId={event.id} Name={event.name} Address={event.address} City={event.city} Day={event.date} NumberOfTickets={event.numberOfTickets} Category={event.category} Price={event.price}/>) : <h2>No hay eventos</h2>}
             </div>
        </div>)
}

export default ClientDashboard;