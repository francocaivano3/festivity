import React, {useState, useEffect} from 'react';
import Auth from "../services/auth";
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import Bgimg from "../assets/hero-image.jpg";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(token) {
            navigate("/"); //DASHBOARD => "/DASHBOARD"
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
            setError("Email inválido");
            return;
        }

        if(passwordState === ""){
            setError("Ingrese la contraseña");
            return;
        }

        setError("");

        try {
            const response = await Auth.login({ UserName: emailState, Password: passwordState});
            const decoded = jwtDecode(response.token);
            console.log(decoded);
            const userRole = decoded.Role;
            
            if(userRole === "Client") {
                navigate("/client");
                window.location.reload();
            } else if(userRole === "EventOrganizer") {
              navigate("/organizer");
                window.location.reload();
            }
            else {
                setError("Credenciales inválidas");
            }
        } catch(e) {
            setError("Ha ocurrido un error");
            console.error("Login error: ", e);
        }
    }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="lg:items-center bg-gradient-to-r from-violet-600 to-indigo-600 flex items-top justify-center px-8 py-16">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-left">
            <h1 className="text-2xl font-bold tracking-tight text-[#FFFFFF]">
              Iniciar Sesión
            </h1>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-sans text-[#FFFFFF] text-lg"
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
                className="font-sans text-[#FFFFFF] text-lg"
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
            {error && <p style={{ color: "#FFA500" }}>{error}</p>}
          <button type='submit' id='button' onClick={handleSendData} className="w-full p-3 bg-[#000000] text-[#FFFFFF] hover:bg-[#775ab0] rounded-xl">
            Iniciar Sesión
          </button>
          <div className="text-center text-white flex flex-col justify-center items-center">
            <p className='mt-4'>Todavía no tenés cuenta?</p>
              <button onClick={() => navigate("/register")} className='underline mt-2 w-fit font-semibold'>Registrarse</button>

              <div className="flex items-center justify-center my-2 p-2 w-3/4">
                  <span className="border-t border-white flex-grow"></span>
                  <span className="mx-2 text-white">o</span>
                  <span className="border-t border-white flex-grow"></span>
              </div>

              <button onClick={() => navigate("/")} className='underline mt-2 w-fit text-white'>Continuar como invitado</button>
          </div>
          </div>
        </div>
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
