import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import {Text} from "lucide-react";

const OrganizerDashboard = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

   return (
    <div className="flex-1 min-h-screen bg-indigo-600">
         <div className="flex p-4"> 
             {isSidebarOpen && <Sidebar />}
             {isSidebarOpen && <button className="z-50" onClick={toggleSidebar}><Text className="h-8 w-8 hover:scale-110 transition-all" /></button>}
             <button onClick={toggleSidebar}><Text className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-white"/></button>
             <h1 className={isSidebarOpen ? "text-3xl font-bold text-white ml-40" : "text-3xl font-bold text-white"}>Organizer Dashboard</h1>
         </div>
    </div>)
}

export default OrganizerDashboard;