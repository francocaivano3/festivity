import Sidebar from "../../components/Sidebar";

const OrganizerDashboard = () => {
   return (
   <div className="flex min-h-screen">
        <Sidebar />
    {/* /*indigo 800 para modo oscuro*/  }
    <div className="flex-1 p-8 bg-indigo-600"> 
        <h1 className="text-3xl font-bold text-white">Organizer Dashboard</h1>
    </div>
   </div>)
}

export default OrganizerDashboard;