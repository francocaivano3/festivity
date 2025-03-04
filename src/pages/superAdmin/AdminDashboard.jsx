import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import Alert from "@mui/material/Alert";
import { AlignLeft, Users, CalendarDays, PersonStanding, Tickets, Edit, Trash2 } from "lucide-react";
import { fetchOrganizers, fetchAllEvents, fetchClients } from "../../utils/fetch";
import EditOrganizerModal from "./EditOrganizerModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import environment from "../../utils/environment";
const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState({message: "", type: ""});
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [stats, setStats] = useState({
        totalOrganizers: 0,
        totalEvents: 0,
        totalClients: 0,
    });
    const [organizers, setOrganizers] = useState([]);
    const [organizerToEdit, setOrganizerToEdit] = useState({});
    const [organizerIdToDelete, setOrganizerIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleModal = (organizerId) => {
      setIsModalOpen(!isModalOpen);
      const organizer = organizers.find((organizer) => organizer.id === organizerId);
      setOrganizerToEdit(organizer); 
    }

    useEffect(() => {
      const loadData = async () => {
        setIsLoading(true); 
    
        try {
          const organizersData = await fetchOrganizers();
          if (organizersData) {
            setOrganizers(organizersData);
          }
          if(organizers){
            setStats((prevStats) => ({...prevStats, totalOrganizers: organizersData.length }));
          }
    
          const eventsData = await fetchAllEvents();
          if (eventsData) {
            setStats((prevStats) => ({ ...prevStats, totalEvents: eventsData.length }));
          }

          const clients = await fetchClients();
          if(clients){
            setStats((prevStats) => ({...prevStats, totalClients: clients.length }));
          }

        } catch (error) {
          console.error("Error cargando los datos:", error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        }
      };
    
      loadData();
    }, []);

    const handleConfirmDelete = async (organizerIdToDelete) => {
      if (organizerIdToDelete && localStorage.getItem("authToken")) {
        try {
          const response = await fetch(`${environment.backendUrl}/api/EventOrganizer/${organizerIdToDelete}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          if (!response.ok) {
            throw new Error("Error deleting organizer");
          }
          setAlert({ message: "Organizador eliminado exitosamente", type: "success" });
          setTimeout(() => {
            window.location.reload();
            setAlert({ message: "", type: "" });
          }, 2500);
          setIsDialogOpen(false);
          setOrganizers((prevOrganizers) => prevOrganizers.filter((organizer) => organizer.id !== organizerIdToDelete));
        } catch (e) {
          console.error("Error deleting organizer: ", e);
          setAlert({ message: "Error al eliminar el organizador", type: "error" });
          setTimeout(() => {
            setAlert({ message: "", type: "" });
          }, 2500);
        }
      }
    };


    const tableTitles = ["ID", "Organizador", "Email", "Número de teléfono", "Acciones"];

    return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-200">
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

        <h1
        className={
            isSidebarOpen
            ? "text-3xl font-bold text-indigo-500 ml-40"
            : "text-3xl font-bold text-indigo-500"
        }
        >
        SuperAdmin Dashboard
        </h1>
      </div>
        
      <div className="bg-gradient-to-r from-violet-500 to-blue-700">
        <h2 className={isSidebarOpen ? "blur-sm text-center pt-4 text-white font-semibold text-xl" : "text-center pt-4 text-white font-semibold text-xl"}>Estadísticas 🚀</h2>
        <div className={isSidebarOpen ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-12 pb-8 blur-sm` : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-12 pb-8`}>
          <StatCard title={"Organizadores Totales"} value={stats.totalOrganizers} icon={<Users size={28}/>} />
          <StatCard title={"Eventos Totales"} value={stats.totalEvents} icon={<CalendarDays size={28}/>} />
          <StatCard title={"Clientes Totales"} value={stats.totalClients} icon={<PersonStanding size={32}/>} />
        </div>
      </div>

        <div className={isSidebarOpen ? "bg-gray-100 border-2 rounded-lg shadow-lg p-6 mx-12 blur-sm" : "bg-gray-100 border-2 rounded-lg shadow-lg p-6 mx-12"}>
            {organizers.length > 0 ?
            <>
            {alert.message && (
            <Alert variant="filled" severity={alert.type} sx={{mb: 2}} className="w-1/2 mx-auto">
                {alert.message}
            </Alert>
            )}
            <h2 className="text-xl mb-4 text-center">Organizadores 👨‍💻</h2>
            <div className="overflow-x-auto max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
              <table className="w-full min-w-max rounded-lg shadow-lg mx-auto text-center">
              <thead className="bg-[#6366f1] sticky top-0 z-10">
                    <tr>
                        {tableTitles.map((title) => (
                            <th key={title} className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-white">{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                        {organizers.map((organizer) => (
                          <tr key={organizer.id}>
                              <td className="px-4 py-4 whitespace-nowrap">{organizer.id}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{organizer.name}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{organizer.email}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{organizer.phone}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => toggleModal(organizer.id)}>
                                    <Edit size={18}/>
                                </button>
                                <button className="text-red-600 hover:text-red-800" onClick={() => {
                                  setOrganizerIdToDelete(organizer.id);
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
            </>
            :
            null}
        </div>
          
        {isModalOpen && <EditOrganizerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} organizerToEdit={organizerToEdit} setAlert={setAlert}/>}    
        <ConfirmDialog 
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleConfirmDelete(organizerIdToDelete)}
        message="Estás seguro de que quieres eliminar a este organizador?"
        />
    </div>
    )

}

export default AdminDashboard;