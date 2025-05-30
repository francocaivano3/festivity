import {
  House,
  Ticket,
  Settings,
  LogOut,
  LogIn,
  CircleUserRound,
  CalendarPlus,
  Calendar,
  UserPlus,
  Moon,
  Sun
} from "lucide-react";
import imgUser from "../assets/hero-image.jpg";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Auth from "../services/auth";
import { ThemeContext } from "../context/themeContext";


const Sidebar = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState("Invitado");
  const [userRole, setUserRole] = useState("");
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (Auth.isTokenExpired(token)) {
        setIsAuth(false);
        Auth.checkAndRemoveExpiredToken();
      } else {
        const decoded = jwtDecode(token);
        setUser(decoded.Name); //ACA HABIA UN || INVITADO
        if (decoded.Role === "Client") {
          setUserRole("Client");
        } else if (decoded.Role === "EventOrganizer") {
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
  };

  return (
    <div className="w-64 fixed z-50 inset-0 min-h-screen dark:text-white">
      <div className="h-screen bg-[#f2f4f6] dark:bg-violet-950 flex flex-col">
        <div className="flex items-center justify-center h-12"></div>

        <nav className="flex-1 px-4 mt-8">
          {!isAuth ? (
            <CircleUserRound className="mx-auto mb-5 h-16 w-16 text-indigo-800 dark:text-white" />
          ) : (
            <img
              src={imgUser}
              alt=""
              className="w-20 h-20 rounded-full mx-auto mb-5"
            />
          )}
          <h2 className="text-xl text-center mb-14">{user}</h2>
          <ul className="space-y-4">
            {userRole !== "SuperAdmin" ? <li>
              <Link
                to={
                  userRole === "Client" || userRole === ""
                    ? "/client"
                    : "/organizer"
                }
                className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded"
              >
                <House className="h-6 w-6" />
                {userRole === "Client" ? (
                  <span>Eventos</span>
                ) : (
                  <span>Dashboard</span>
                )}
              </Link>
            </li> : 
            <li>
              <Link to={"/superadmin"} className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
                <House className="h-6 w-6" />
                <span>Dashboard</span>
              </Link>  
            </li>}
            {userRole !== "SuperAdmin" ? <li>
              <Link
                to={
                  userRole === "Client" || userRole === ""
                    ? "/my-tickets"
                    : "/my-events"
                }
                className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded"
              >
                {userRole === "Client" || userRole === "" ? (
                  <>
                    <Ticket className="h-6 w-6" />
                    <span>Mis tickets</span>
                  </>
                ) :  (
                  <>
                    <Calendar className="h-6 w-6" />
                    <span>Mis eventos</span>
                  </>
                )}
              </Link>
            </li>
            :
            <Link to="/create-organizer" className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded">
              <>
                <UserPlus className="h-6 w-6" />
                <span>Crear Organizador</span>
              </>
            </Link>
            }
            {userRole === "EventOrganizer" && (
              <li>
                <Link
                  to="/create-event"
                  className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded"
                >
                  <CalendarPlus className="h-6 w-6" />
                  <span>Crear evento</span>
                </Link>
              </li>
            )}
            {userRole !== "EventOrganizer" && userRole !== "SuperAdmin" && <li>
              <Link
                to="/configuration"
                className="flex items-center space-x-2 hover:bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded"
              >
                <Settings className="h-6 w-6" />
                <span>Configuración</span>
              </Link>
            </li>}

          </ul>
        </nav>
        <div className="p-4">

          {isAuth ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 hover:bg-gradient-to-r from-rose-600 to-red-800 p-2 rounded"
            >
              <LogOut className="h-6 w-6" />
              <span>Cerrar Sesión</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full flex items-center space-x-2 hover:bg-gradient-to-r from-green-700 to-teal-600 p-2 rounded"
            >
              <LogIn className="h-6 w-6" />
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
