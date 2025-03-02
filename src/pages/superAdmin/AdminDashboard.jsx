import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import Alert from "@mui/material/Alert";
import { AlignLeft, Users, CalendarDays, PersonStanding, Tickets } from "lucide-react";
const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState({message: "", type: ""});
    const [stats, setStats] = useState({
        totalOrganizers: 0,
        totalEvents: 0,
        totalClients: 0,
        totalSold: 0,
    })

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
        <div className={isSidebarOpen ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-12 pb-8 blur-sm` : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-12 pb-8`}>
          <StatCard title={"Organizadores Totales"} value={stats.totalOrganizers} icon={<Users size={28}/>} />
          <StatCard title={"Eventos Totales"} value={stats.totalEvents} icon={<CalendarDays size={28}/>} />
          <StatCard title={"Clientes Totales"} value={stats.totalClients} icon={<PersonStanding size={32}/>} />
          <StatCard title={"Entradas Vendidas"} value={stats.totalSold} icon={<Tickets size={28}/>} />
        </div>
      </div>

    </div>
    )

}

export default AdminDashboard;