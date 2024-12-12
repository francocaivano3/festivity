import {House, Ticket, Settings, LogOut, LogIn, CircleUserRound, CalendarPlus, Calendar} from "lucide-react";
import imgUser from "../assets/hero-image.jpg";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Auth from "../services/auth";

const Sidebar = () => {

    const [isAuth, setIsAuth] = useState(true);
    const [user, setUser] = useState("Usuario");
    const [userRole, setUserRole] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        if (Auth.isTokenExpired(token)) {
            setIsAuth(false);
            Auth.checkAndRemoveExpiredToken();
        } else {
            const decoded = jwtDecode(token);
            setUser(decoded.Name || "Usuario");
            if(decoded.Role === "Client"){
              setUserRole("Client");
            } else if(decoded.Role === "EventOrganizer"){
              setUserRole("EventOrganizer");
            } else {
              setUserRole("SuperAdmin");
            }
        }
    } else {
        setIsAuth(false);
    }
    }, [token]);
    

    const handleLogout = () => {
        Auth.logout();
        setIsAuth(false);
        navigate("/");
        window.location.reload(false);
    }

    return (<div className="w-64 fixed z-50 inset-0 min-h-screen">
         <div className="h-screen bg-[#f2f4f6] text-dark flex flex-col">
      <div className="flex items-center justify-center h-12">
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
            {!isAuth ? <CircleUserRound className="mx-auto mb-5 h-16 w-16 text-indigo-800"/> : <img src={imgUser} alt="" className="w-20 h-20 rounded-full mx-auto mb-5"/>}
            {isAuth ? <h2 className="text-xl text-center mb-14">{user}</h2> : <h2 className="text-xl text-center mb-14">{user}</h2>}
        <ul className="space-y-4">
          <li>
            <Link to={userRole === "Client" || userRole === "" ? "/" : "/organizer"} className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
              <House className="h-6 w-6" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={userRole === "Client" || userRole === "" ? "/" : "/organizer"} className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
              {userRole === "Client" || userRole === "" ? 
              <>
              <Ticket className="h-6 w-6" />
              <span>Mis tickets</span>
              </>
               :
               <>
               <Calendar className="h-6 w-6" />
               <span>Mis eventos</span>
               </>
              }
            </Link>
          </li>
          {userRole === "EventOrganizer" &&
            <li>
              <Link to="/create-event" className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
                <CalendarPlus className="h-6 w-6" />
                <span>Crear evento</span>
              </Link>
            </li>
          }
          <li>
            <Link to="/projects" className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
            <Settings className="h-6 w-6" />
              <span>Configuración</span>
            </Link>
          </li>
          
        </ul>
      </nav>
      <div className="p-4">
        {isAuth ? 
        <button onClick={handleLogout} className="w-full flex items-center space-x-2 hover:bg-gradient-to-r from-rose-600 to-red-800 p-2 rounded">
          <LogOut className="h-6 w-6" />
          <span>Cerrar Sesión</span>
        </button>
         :
         <Link to="/login" className="w-full flex items-center space-x-2 hover:bg-gradient-to-r from-green-700 to-teal-600 p-2 rounded">
          <LogIn className="h-6 w-6" />
          <span>Iniciar Sesión</span>
        </Link> 
         }
      </div>
    </div>
    </div>)
}

export default Sidebar;