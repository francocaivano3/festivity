import { useState, useEffect } from "react";
import Ticket from "../../components/Ticket";
import { fetchAllMyTickets } from "../../utils/fetch";
import { AlignLeft } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Skeleton from "../../components/Skeleton";
import Empty from "../../components/Empty";
import img from "../../assets/empty-shopping-trolley.png";
const MyTickets = () => {
    const [events, setEvents] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isSidebarOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        const loadEvents = async () => {
            const fetchedEvents = await fetchAllMyTickets();
            console.log("Datos recibidos:", fetchedEvents);
            if(fetchedEvents) {
                setEvents(fetchedEvents);
            }
        };

        setTimeout(() => {
            setIsLoading(false);
        }, 1500); 

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
      <div className="bg-gradient-to-r from-violet-100 to-violet-300 dark:bg-gradient-to-r dark:from-[#111111] dark:to-[#222222] min-h-screen">
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40" onClick={toggleSidebar} />
        )}
        <div className="flex p-4 bg-gradient-to-r from-violet-100 to-violet-300 dark:bg-gradient-to-r dark:from-[#111111] dark:to-[#222222]">
          {isSidebarOpen && <Sidebar />}
          {isSidebarOpen && (
            <button className="z-50 sticky top-0" onClick={toggleSidebar}>
              <AlignLeft className="h-8 w-8 hover:scale-110 transition-all dark:text-white" />
            </button>
          )}
          <button onClick={toggleSidebar}>
            <AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500 dark:text-violet-500" />
          </button>
          <h1
            className={
              isSidebarOpen
                ? "text-3xl font-bold text-indigo-500 ml-40 dark:text-violet-600"
                : "text-3xl font-bold text-indigo-500 dark:text-violet-600"
            }
          >
            Mis Tickets
          </h1>
        </div>

        {isLoading ? (
          <div className="mx-auto w-2/3 max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-12 py-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} type="tickets" />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div
            className={
              isSidebarOpen
                ? "mx-auto w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-12 py-8 blur-sm"
                : "mx-auto w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-12 py-8"
            }
          >
            {events.map((event, i) => (
              <Ticket key={i} event={event} />
            ))}
          </div>
        ) : (
          <div
            className={
              isSidebarOpen
                ? "min-h-screen flex justify-center blur-sm"
                : "min-h-screen flex justify-center"
            }
          >
            <Empty
              image={img}
              message={"NO TIENES TICKETS"}
              className={"h-[60vh] text-center mt-8"}
            />
          </div>
        )}
      </div>
    );
}

export default MyTickets;