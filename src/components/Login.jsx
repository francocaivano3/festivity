import React, {useState, useEffect} from 'react';
import Auth from "../services/auth";
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import Bgimg from "../assets/hero-image.jpg";
import { jwtDecode } from "jwt-decode";
import Alert from "@mui/material/Alert";

const Login = () => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [error, setError] = useState("");
    const [alert, setAlert] = useState({message: "", type: ""});
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("authToken");
  
      if (token) {
          try {
              const decoded = jwtDecode(token);
              const role = decoded.Role;
            
              setTimeout(() => {  
                  if (role === "EventOrganizer" && window.location.pathname !== "/organizer") {
                      navigate("/organizer");
                  } else if (role === "Client" && window.location.pathname !== "/client") {
                      navigate("/client");
                  }
              }, 500);
          } catch (error) {
              console.error("Error decoding token:", error);
              localStorage.removeItem("authToken"); 
          }
      }
  }, []);

    const handleEmailChange = (e) => setEmailState(e.target.value);
    const handlePasswordChange = (e) => setPasswordState(e.target.value);

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

  const handleSendData = async(e) => {
        e.preventDefault();

        if(!validateEmail(emailState)){
          setAlert({ message: "Email inválido", type: "error" });
            return;
        }

        if(passwordState === ""){
          setAlert({ message: "Ingrese una contraseña", type: "error" });
            return;
        }

        setError("");

        try {
            const response = await Auth.login({ UserName: emailState, Password: passwordState});
            const decoded = jwtDecode(response.token);
            const userRole = decoded.Role;

            if(userRole === "Client") {
              navigate("/client");
              window.location.reload();
            } else if(userRole === "EventOrganizer") {
              navigate("/organizer");
              window.location.reload();
            } else if(userRole === "SuperAdmin"){
              navigate("/superadmin");
              window.location.reload();
            }
            else {
              setAlert({ message: "Credenciales inválidas", type: "error" });
            }

        } catch(e) {
          setAlert({ message: "Usuario o contraseña incorrectas", type: "error" });
        }
    }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="lg:items-center bg-gradient-to-r from-purple-200 to-indigo-300 dark:bg-gradient-to-r dark:from-violet-600 dark:to-indigo-600  flex items-top justify-center px-8 py-16">
        <form
          className="mx-auto w-full max-w-sm space-y-6"
          onSubmit={handleSendData}
        >
          <div className="space-y-2 text-left">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-violet-600 dark:bg-gradient-to-r dark:from-white dark:to-white bg-clip-text text-transparent ">
              Iniciar Sesión
            </h1>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-sans text-violet-500 dark:text-white text-lg"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleEmailChange}
                value={emailState}
                required
                placeholder="juanperez@gmail.com"
                className="w-full p-2 border border-black rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="font-sans text-violet-500 dark:text-white text-lg"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handlePasswordChange}
                value={passwordState}
                required
                className="w-full p-2 border border-black rounded-lg"
                placeholder="**********"
              />
            </div>
            {alert.message && (
             <div className="w-full mx-auto">
               <Alert
                 variant="filled"
                 severity={alert.type}
                 sx={{ mb: 2 }}
                 className="w-full mx-auto"
               >
                 {alert.message}
               </Alert>
             </div>
           )}
            <button
              type="submit"
              id="button"
              className="w-full p-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-[#FFFFFF] dark:bg-gradient-to-r dark:from-[#111111] dark:to-[#111111] dark:hover:bg-gradient-to-r dark:hover:from-violet-500 dark:hover:to-indigo-600 rounded-xl"
            >
              Iniciar Sesión
            </button>
            <div className="text-center text-violet-500 dark:text-white flex flex-col justify-center items-center">
              <p className="mt-4">Todavía no tenés cuenta?</p>
              <button
                onClick={() => navigate("/register")}
                className="underline mt-2 w-fit font-semibold"
              >
                Registrarse
              </button>

              <div className="flex items-center justify-center my-2 p-2 w-3/4">
                <span className="border-t border-[#1f1f1f] dark:border-white flex-grow"></span>
                <span className="mx-2 text-[#1f1f1f] dark:text-white">o</span>
                <span className="border-t border-[#1f1f1f] dark:border-white flex-grow"></span>
              </div>

              <button
                onClick={() => navigate("/")}
                className="underline mt-2 w-fit text-violet-500 dark:text-white font-semibold"
              >
                Continuar como invitado
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="hidden lg:block relative bg-cover bg-center"
        style={{ backgroundImage: `url(${Bgimg})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={Logo}
            alt="logo de festivity"
            width={300}
            height={150}
            className="z-10 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
