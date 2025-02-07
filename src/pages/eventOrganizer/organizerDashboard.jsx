import Sidebar from "../../components/Sidebar";
import EditEventModal from "./EditEventModal";
import { useEffect, useState } from "react";
import { Text, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import environment from "../../utils/environment";
import StatCard from "../../components/StatCard";
import { CalendarDays, Users, DollarSign, TrendingUp, Edit, Trash2 } from "lucide-react"

const OrganizerDashboard = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  // TODO ESTO ESTA HARDCODEADO, MODIFICAR ENDPOINT
  const totalEvents = events.length;
  const totalSold = totalEvents * 100;
  const totalEarnings = totalSold * 1000;
  const averagePrice = totalEarnings / totalSold;
  //
  const tableTitles = ["Nombre del Evento", "Fecha", "Ciudad", "Tickets", "Precio", "Acciones"];

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
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
      <div className={isSidebarOpen ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-12 blur-sm` : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-12`}>
        <StatCard title={"Eventos Totales"} value={totalEvents} icon={<CalendarDays size={28}/>} />
        <StatCard title={"Total de Asistentes"} value={totalSold} icon={<Users size={28}/>} />
        <StatCard title={"Ingresos Totales"} value={`$${totalEarnings}`} icon={<DollarSign size={28}/>} />
        <StatCard title={"Valor promedio de la entrada"} value={`$${averagePrice}`} icon={<TrendingUp size={28}/>} />
      </div>

      <div className={isSidebarOpen ? `bg-gray-100 border-2 rounded-lg shadow-md p-6 mx-12 blur-sm` : `bg-gray-100 border-2 rounded-lg shadow-md p-6 mx-12`}>
        <h2 className="text-xl font-semibold mb-4">Eventos Activos 🔥</h2>
        <div>
            <table className="min-w-full rounded-lg">
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
                            <td className="px-6 py-4 whitespace-nowrap">${event.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => setIsModalOpen(true)}>
                                    <Edit size={18}/>
                                </button>
                                <button className="text-red-600 hover:text-red-800 mr-2">
                                    <Trash2 size={18}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      {isModalOpen && <EditEventModal/>}
    </div>
  );
};

export default OrganizerDashboard;
