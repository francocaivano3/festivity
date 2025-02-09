import Sidebar from "../../components/Sidebar";
import EditEventModal from "./EditEventModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import environment from "../../utils/environment";
import StatCard from "../../components/StatCard";
import { CalendarDays, Users, DollarSign, TrendingUp, Edit, Trash2, Text } from "lucide-react";
import Alert from "@mui/material/Alert";
import { useAlert } from "../../context/alertContext";
import ConfirmDialog from "../../components/ConfirmDialog";

const OrganizerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState({});
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({message: "", type: ""});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = (eventId) => {
    setIsModalOpen(!isModalOpen);
    const event = events.find((event) => event.id === eventId);
    setEventToEdit(event); 
  }

  useEffect(() => {
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
        console.log(data);
        const filteredData = data.filter((event) => event.numberOfTickets > 0)
        setEvents(filteredData);
      } catch (e) {
        console.error("Error while fetching events: ", e);
      }
    };
    fetchEvents();
  }, []);

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

  // TODO ESTO ESTA HARDCODEADO, MODIFICAR ENDPOINT
  const totalEvents = events.length;
  const totalSold = totalEvents * 100;
  const totalEarnings = totalSold * 1000;
  const averagePrice = totalEarnings / totalSold || 0;
  //
  const tableTitles = ["Nombre del Evento", "Fecha", "Ciudad", "Tickets", "Precio", "Acciones"];
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
        {isSidebarOpen && (
          <button className="z-50 sticky top-0" onClick={toggleSidebar}>
            <Text className="h-8 w-8 hover:scale-110 transition-all" />
          </button>
        )}
        <button onClick={toggleSidebar}>
          <Text className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500" />
        </button>

        <h1
        className={
            isSidebarOpen
            ? "text-3xl font-bold text-indigo-500 ml-40"
            : "text-3xl font-bold text-indigo-500"
        }
        >
        Organizer Dashboard
        </h1>

      </div>
      <div className={isSidebarOpen ? `bg-gradient-to-r from-violet-500 to-blue-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-12 pb-8 blur-sm` : `bg-gradient-to-r from-violet-500 to-blue-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-12 pb-8`}>
        <StatCard title={"Eventos Totales"} value={totalEvents} icon={<CalendarDays size={28}/>} />
        <StatCard title={"Total de Asistentes"} value={totalSold} icon={<Users size={28}/>} />
        <StatCard title={"Ingresos Totales"} value={`$${totalEarnings}`} icon={<DollarSign size={28}/>} />
        <StatCard title={"Valor promedio de la entrada"} value={`$${averagePrice}`} icon={<TrendingUp size={28}/>} />
      </div>

      <div className={isSidebarOpen ? `bg-gray-100 border-2 rounded-lg shadow-lg p-6 mx-12 blur-sm` : `bg-gray-100 border-2 rounded-lg shadow-md p-6 mx-12`}>
        
        {events.length > 0 ? 
        <>
        <h2 className="text-xl font-semibold mb-4">Eventos Activos 🔥</h2>
        <div>
            <table className="min-w-full rounded-lg shadow-lg">
                <thead className="bg-[#6366f1]">
                    <tr>
                        {tableTitles.map((title) => (
                            <th key={title} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(event.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{event.city}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{event.numberOfTickets}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{event.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => toggleModal(event.id)}>
                                    <Edit size={18}/>
                                </button>
                                <button className="text-red-600 hover:text-red-800 mr-2" onClick={() => {
                                  setEventIdToDelete(event.id);
                                  setIsDialogOpen(true);
                                }}>
                                    <Trash2 size={18}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </> : <h3 className="underline">No hay eventos activos</h3>}
      </div>
      {isModalOpen && <EditEventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} eventToEdit={eventToEdit} setAlert={setAlert}/>}
      {alert.message && (
    <Alert variant="filled" severity={alert.type} sx={{mb: 2}} className="w-1/4 mx-auto">
        {alert.message}
    </Alert>
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
