import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../services/auth";
import Logo from "../assets/logo.png";
import Bgimg from "../assets/hero-image.jpg";
import Alert from "@mui/material/Alert";

const Register = () => {
 const [userName, setUserName] = useState("");
 const [emailState, setEmailState] = useState("");
 const [passwordState, setPasswordState] = useState("");
 const [phone, setPhone] = useState("");
 const [error, setError] = useState("");
 const [alert, setAlert] = useState({message: "", type: ""});
 const navigate = useNavigate();

 const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
 }

 const handleEmailChange = (e) => setEmailState(e.target.value);
 const handlePasswordChange = (e) => setPasswordState(e.target.value);
 const handleUserName = (e) => setUserName(e.target.value);
 const handlePhone = (e) => setPhone(e.target.value);

 const handleSendData = async(e) => {
    e.preventDefault();

    if(!validateEmail(emailState)){
        setError("Invalid email address");
        return;
    }

    if(passwordState === ""){
        setError("Password is required");
        return;
    }
    
    if(userName === ""){
        setError("El ombre de usuario es requerido");
        return;
    }

    if(phone === ""){
        setError("El número de teléfono es requerido");
        return;
    }

    setError("");

    try {
        const response = await Auth.register({ Name: userName, Email: emailState, Password: passwordState, Phone: phone });
        if(response === true){
            setAlert({ message: "Registrado con éxito", type: "success" });
            setTimeout(() => {
              setAlert({ message: "", type: "" });
              navigate("/login");
            }, 2000);
        }
    } catch(e) {
        setAlert({message: "Ha ocurrido un error", type: "error"});
    }
}
 
 return (
<div className="grid min-h-screen lg:grid-cols-2">
     <div className="lg:items-center bg-gradient-to-r from-violet-600 to-indigo-600 flex items-top justify-center px-8 py-8">
        <div className="mx-auto max-w-md space-y-6 px-8 shadow-2xl">
          <div className="space-y-2 text-left">
            <h1 className="text-2xl font-bold tracking-tight text-[#FFFFFF] mt-2">
              Registrarse
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
            <div className="space-y-2">
              <label
                htmlFor="userName"
                className="font-sans text-[#FFFFFF] text-lg"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                onChange={handleUserName}
                value={userName}
                required
                className="w-full p-2 border border-black rounded-lg"
                placeholder="JuanPerez"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="font-sans text-[#FFFFFF] text-lg"
              >
                Número de Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={handlePhone}
                value={phone}
                required
                className="w-full p-2 border border-black rounded-lg"
                placeholder="341-1234567"
              />
            </div>
            <br />
            {error && <p style={{ color: "#D66666" }}>{error}</p>}
            {alert.message && 
            <div className="w-full mx-auto">
                <Alert variant="filled" severity={alert.type} sx={{mb: 2}} className="w-full mx-auto">
                    {alert.message}
                </Alert>
            </div>
            }
          
          <button type='submit' onClick={handleSendData} className="w-full p-3 bg-[#000000] text-[#FFFFFF] hover:bg-[#775ab0] rounded-xl">
            Registrarse
          </button>
          <div className="text-center text-white flex flex-col justify-center items-center">
            <p className='mt-4'>Ya tenés cuenta?</p>
            <a href='/login' className='underline mt-2 w-fit mb-2'>Iniciar Sesión</a>
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
              className="z-10"
            />
          </div>
        </div>
</div>
      )
}

export default Register;