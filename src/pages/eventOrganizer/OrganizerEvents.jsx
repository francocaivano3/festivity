import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import {AlignLeft} from "lucide-react";
import EventCard from "../../components/EventCard";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../../utils/fetch";
import Skeleton from "../../components/Skeleton";
import Empty from "../../components/Empty";
import img from "../../assets/new-years-party-decoration.png";
const OrganizerEvents = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const toggleSidebar = () => {
        if(!isSidebarOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        setIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(() => {
        return () => {
            document.body.classList.remove("overflow-hidden"); 
        };
    }, []);

    useEffect(() => {
        const loadEvents = async () => {
            const fetchedEvents = await fetchEvents();
            if(fetchedEvents) {
                setEvents(fetchedEvents);
            }
        };
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        loadEvents();
    }, []);

   return (
    <div className="min-h-screen bg-gradient-to-r from-violet-200 to-green-200 min-w-full">
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
             <h1 className={isSidebarOpen ? "text-3xl font-bold text-indigo-500 ml-40" : "text-3xl font-bold text-indigo-500"}>Mis Eventos</h1>
         </div>
         {isLoading ? 
        (
            <div className="mx-auto w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-3 gap-12 py-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} type="events" />
                ))}
            </div>
        ) 
         :
         (events.length > 0 ? 
         <div className={isSidebarOpen ? `mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 blur-sm min-w-full` : `mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 min-w-full`}>
            {events.map(event => <EventCard role={"EventOrganizer"} key={event.id} Name={event.name} Address={event.address} City={event.city} Day={event.date} NumberOfTickets={event.numberOfTickets} Category={event.category} Price={event.price}/>)}
         </div>
         :
        <div className={isSidebarOpen ? "flex items-center justify-center w-full h-[60vh] p-10 blur-sm" : "flex items-center justify-center w-full h-[60vh] p-10"}>
            <Empty image={img} message={"No hay eventos disponibles"} className={"h-[60vh] text-center"}/>
        </div>
        )
         
}            
            
    </div>)
}

export default OrganizerEvents;

{/* <div className={isSidebarOpen ? 
                (isSidebarOpen 
                ? "mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 blur-sm w-full" 
                : "mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10 w-full") 
                : "flex items-center justify-center w-full h-[60vh] p-10"}>

                {events.length > 0 ? events.map(event => <EventCard role={"EventOrganizer"} key={event.id} Name={event.name} Address={event.address} City={event.city} Day={event.date} NumberOfTickets={event.numberOfTickets} Category={event.category} Price={event.price}/>) : <Empty image={img} message={"No hay eventos disponibles"} className={"h-[60vh] text-center"}/>}
            </div>} */}