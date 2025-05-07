import Sidebar from "../../components/Sidebar";
import EditEventModal from "./EditEventModal";
import { useEffect, useState, } from "react";
import environment from "../../utils/environment";
import StatCard from "../../components/StatCard";
import { CalendarDays, Users, DollarSign, TrendingUp, Edit, Trash2, AlignLeft } from "lucide-react";
import Alert from "@mui/material/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import { fetchAllSold, fetchAvailableTickets } from "../../utils/fetch";

const OrganizerDashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState({});
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({message: "", type: ""});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalSold: 0,
    averagePrice: 0,
  });
   const [unAvailableEvents, setUnAvailableEvents] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = (eventId) => {
    setIsModalOpen(!isModalOpen);
    const event = events.find((event) => event.id === eventId);
    setEventToEdit(event); 
  }

  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${environment.backendUrl}/api/Events/organizer/events`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        const availableEventsTickets = await fetchAvailableTickets();
        const availableEvents = [];
        const ticketsUnAvailable = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < availableEventsTickets.length; j++) {
            if (data[i].id == availableEventsTickets[j].id) {
              if (availableEventsTickets[j].availableTickets > 0) {
                const dataCopy = {...data[i], availableTickets : availableEventsTickets[j].availableTickets }
                availableEvents.push(dataCopy);
              } else {
                const dataCopy = {
                  ...data[i],
                  availableTickets: availableEventsTickets[j].availableTickets,
                };
                ticketsUnAvailable.push(dataCopy)
              }
            }
          }
       
        };
        setEvents(availableEvents);
        setUnAvailableEvents(ticketsUnAvailable);
        
      } catch (e) {
        console.error("Error while fetching events: ", e);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    // let totalSold = 0;
    // let totalPrice = 0;

    // const calculateStats = async () => {
    //   for(let i = 0; i < events.length; i++) {
    //     const eventId = events[i].id;
    //     const sold = await fetchSold(eventId);
    //     totalSold += sold;
    //     totalPrice += events[i].price;
    //   }
      
    //   let averagePrice = totalPrice > 0 ? totalPrice / events.length : 0;
    //   averagePrice = averagePrice.toFixed(2);

    //   setStats({
    //     totalEvents: events.length,
    //     totalSold,
    //     averagePrice
    //   });
    // }
    if (events.length === 0) return;
    const calculateStats = async () => {
      const allEvents = [...events, ...unAvailableEvents];
      const totalSold = await fetchAllSold();
      const totalPrice = allEvents.reduce((acc, e) => acc + e.price, 0);
      const averagePrice = allEvents.length > 0 ? (totalPrice / allEvents.length).toFixed(2) : 0;
    
      setStats({ totalEvents: allEvents.length, totalSold, averagePrice });
    };

  
    calculateStats();
  }, [events]);


  const handleConfirmDelete = async (eventIdToDelete) => {
    if (eventIdToDelete && localStorage.getItem("authToken")) {
      try {
        const response = await fetch(`${environment.backendUrl}/api/Events/${eventIdToDelete}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error deleting event");
        }
        setAlert({ message: "Evento eliminado exitosamente", type: "success" });
        setTimeout(() => {
          setAlert({ message: "", type: "" });
        }, 3500);
        setIsDialogOpen(false);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventIdToDelete))
      } catch (e) {
        console.error("Error deleting event: ", e);
        setAlert({ message: "Error al eliminar el evento", type: "error" });
      }
    }
  };

  const tableTitles = ["Nombre del Evento", "Fecha", "Ciudad", "Tickets", "Precio", "Acciones"];
  console.log(unAvailableEvents)

  return (
    <div className="min-h-screen  bg-gray-50 dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-900">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40" onClick={toggleSidebar} />
      )}
      <div className="flex p-4">
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
              ? "text-3xl font-bold text-indigo-500 ml-40 dark:text-violet-700"
              : "text-3xl font-bold text-indigo-500 dark:text-violet-700"
          }
        >
          Organizer Dashboard
        </h1>
      </div>

      <div className="bg-gradient-to-r from-violet-500 to-blue-700 dark:bg-gradient-to-r dark:from-[#1f1f1f] dark:to-[#1f1f1f]">
        <h2
          className={
            isSidebarOpen
              ? "blur-sm text-center pt-4 text-white font-semibold text-2xl dark:text-violet-600"
              : "text-center pt-4 text-white font-semibold text-2xl dark:text-violet-600 "
          }
        >
          Estadísticas 🚀
        </h2>
        <div
          className={
            isSidebarOpen
              ? `flex flex-col md:flex-row justify-between mx-12 gap-6 mb-8 px-12 pb-8 blur-sm`
              : `flex flex-col md:flex-row justify-between mx-12 gap-6 mb-8 px-12 pb-8`
          }
        >
          <StatCard
            title={"Eventos Totales"}
            value={stats.totalEvents}
            icon={<CalendarDays size={28} />}
          />
          <StatCard
            title={"Entradas Vendidas"}
            value={stats.totalSold}
            icon={<Users size={28} />}
          />
          <StatCard
            title={"Valor promedio de la entrada"}
            value={`$${stats.averagePrice}`}
            icon={<TrendingUp size={28} />}
          />
        </div>
      </div>

      <div
        className={
          isSidebarOpen
            ? `bg-gray-100 border-2 rounded-lg shadow-lg p-6 mx-12 blur-sm dark:bg-[#1f1f1f] dark:border-none`
            : `bg-gray-100 border-2 rounded-lg shadow-md p-6 mx-12 dark:bg-[#1f1f1f] dark:border-none`
        }
      >
        {events.length > 0 ? (
          <>
            {alert.message && (
              <Alert
                variant="filled"
                severity={alert.type}
                sx={{ mb: 2 }}
                className="w-1/2 mx-auto"
              >
                {alert.message}
              </Alert>
            )}
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Eventos Activos 🔥
            </h2>
            <div className="overflow-x-auto max-h-48">
              <table className="w-full min-w-max rounded-lg shadow-lg dark:text-white">
                <thead className="bg-[#6366f1] dark:bg-violet-700 sticky top-0 z-10">
                  <tr>
                    {tableTitles.map((title) => (
                      <th
                        key={title}
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-violet-500">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.availableTickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${event.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          onClick={() => toggleModal(event.id)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            setEventIdToDelete(event.id);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="1/2 bg-white dark:bg-[#1f1f1f]">
            <div className="flex justify-center">
              <h2 className="font-bold text-violet-700 p-6 mx-auto underline">
                NO HAY EVENTOS ACTIVOS
              </h2>
            </div>
          </div>
        )}
      </div>
      <div
        className={
          isSidebarOpen
            ? `bg-gray-100 border-2 rounded-lg  p-6 mx-12 blur-sm dark:bg-[#1f1f1f] dark:border-none mt-8`
            : `bg-gray-100 border-2 rounded-lg  p-6 mx-12 dark:bg-[#1f1f1f] dark:border-none mt-8`
        }
      >
        {unAvailableEvents.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Eventos Finalizados <span className="text-blue-500">❄</span>
            </h2>
            <div className="overflow-x-auto max-h-48 ">
              <table className="w-full min-w-max rounded-lg shadow-lg dark:text-white">
                <thead className="bg-[#6366f1] dark:bg-violet-700 sticky top-0 z-10">
                  <tr>
                    {tableTitles.map((title) => (
                      <th
                        key={title}
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-violet-500">
                  {unAvailableEvents.map((unAvailableEvents) => (
                    <tr key={unAvailableEvents.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {unAvailableEvents.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(unAvailableEvents.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {unAvailableEvents.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {unAvailableEvents.availableTickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${unAvailableEvents.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            setEventIdToDelete(unAvailableEvents.id);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="1/2 bg-white dark:bg-[#1f1f1f]">
            <div className="flex justify-center">
              <h2 className="font-bold text-violet-700 p-6 mx-auto underline">
                NO HAY EVENTOS INACTIVOS
              </h2>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <EditEventModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          eventToEdit={eventToEdit}
          setAlert={setAlert}
        />
      )}

      <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleConfirmDelete(eventIdToDelete)}
        message="Estás seguro de que quieres eliminar este evento?"
      />
    </div>
  );
};

export default OrganizerDashboard;
