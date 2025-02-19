import { useState, useEffect } from "react";
import Ticket from "../../components/Ticket";
import { fetchAllMyTickets } from "../../utils/fetch";
import { AlignLeft } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const MyTickets = () => {
    const [events, setEvents] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            const fetchedEvents = await fetchAllMyTickets();
            console.log("Datos recibidos:", fetchedEvents);
            if(fetchedEvents) {
                setEvents(fetchedEvents);
            }
        };
        loadEvents();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isSidebarOpen]);

    return (
        <div>
            {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex p-4">
        {isSidebarOpen && <Sidebar />}
        {isSidebarOpen && (
          <button className="z-50 sticky top-0" onClick={toggleSidebar}>
            <AlignLeft className="h-8 w-8 hover:scale-110 transition-all" />
          </button>
        )}
        <button onClick={toggleSidebar}>
          <AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500" />
        </button>
            <h1 className={isSidebarOpen ? "text-3xl font-bold text-indigo-500 ml-40" : "text-3xl font-bold text-indigo-500"}>Mis Tickets</h1>
        </div>
        {events.length > 0 ? 
        <div className={isSidebarOpen ? "mx-auto w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-12 py-8 blur-sm" : "mx-auto w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-12 py-8"}>
            {events.map((event, i) => (
                <Ticket key={i} event={event}/>
            ))}
        </div>
        :
        <div className={isSidebarOpen ? "min-h-screen flex justify-center blur-sm" : "min-h-screen flex justify-center"}>
            <h1 className="text-[#6366f1] underline font-bold text-xl">NO TIENES TICKETS</h1>
        </div>}

    </div>  
    );
}

export default MyTickets;