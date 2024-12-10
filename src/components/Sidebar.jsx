import { Link } from "react-router-dom";
import {House, Ticket, Settings, LogOut} from "lucide-react";
import imgUser from "../assets/hero-image.jpg";

const Sidebar = () => {
    return (<>
         <div className="h-screen bg-[#f2f4f6] text-dark flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16">
        {/* <div className="text-2xl font-bold">Your Logo</div> */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
            <img src={imgUser} alt="" className="w-20 h-20 rounded-full mx-auto mb-5"/>
            <h2 className="text-xl text-center mb-14">Usuario</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
              <House className="h-6 w-6" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/team" className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
              <Ticket className="h-6 w-6" />
              <span>Mis tickets</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
            <Settings className="h-6 w-6" />
              <span>Configuración</span>
            </Link>
          </li>
          
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4">
        <Link to="/settings" className="flex items-center space-x-2 hover:bg-gradient-to-r from-rose-600 to-red-800 p-2 rounded">
          <LogOut className="h-6 w-6" />
          <span>Cerrar Sesión</span>
        </Link>
      </div>
    </div>
    </>)
}

export default Sidebar;