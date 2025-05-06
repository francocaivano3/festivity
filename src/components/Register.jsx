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
        // setError("Email inválido");
        setAlert({ message: "Email inválido", type: "error" });
        return;
    }

    if(passwordState === ""){
        setError("la Contraseña es requerida");
        return;
    } else if(passwordState.length < 6){
      setAlert({ message: "La contraseña debe tener al menos 6 carácteres", type: "error" });
      return;
    }
    
    if(userName === ""){
      setAlert({ message: "El nombre de usuario es requerido", type: "error" });
        return;
    }

    if(phone === ""){
      setAlert({ message: "El número de teléfono es requerido", type: "error" });
        return;
    } else if(phone.length < 10) {
      setAlert({ message: "Ingrese un número de teléfono válido", type: "error" });
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
     <div className="lg:items-center bg-gradient-to-r from-purple-200 to-indigo-300 dark:bg-gradient-to-r dark:from-violet-600 dark:to-indigo-600 flex items-top justify-center px-8 py-8">
       <div className="mx-auto max-w-md space-y-6 px-8 shadow-2xl rounded-xl">
         <div className="space-y-2 text-left">
           <h1 className="text-2xl font-bold tracking-tight text-violet-400 dark:text-white mt-4">
             Registrarse
           </h1>
         </div>
         <div className="space-y-4">
           <div className="space-y-2">
             <label
               htmlFor="email"
               className="font-sans text-violet-600 dark:text-white text-lg"
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
               className="font-sans text-violet-600 dark:text-white text-lg"
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
               className="font-sans text-violet-600 dark:text-white text-lg"
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
               className="font-sans text-violet-600 dark:text-white text-lg"
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
               placeholder="3411234567"
             />
           </div>
           <br />

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
             onClick={handleSendData}
             className="w-full p-3 bg-gradient-to-r from-violet-500 to-indigo-400 text-[#FFFFFF] dark:bg-gradient-to-r dark:from-black dark:to-black dark:hover:bg-gradient-to-r dark:hover:from-[#775ab0] dark:hover:to-[#775ab0] rounded-xl"
           >
             Registrarse
           </button>

           <div className="text-center text-violet-500 dark:text-white flex flex-col justify-center items-center">
             <p className="mt-2">Ya tenés cuenta?</p>
             <a href="/login" className="underline mt-2 w-fit">
               Iniciar Sesión
             </a>

             <div className="flex items-center justify-center my-2 p-2 w-3/4">
               <span className="border-t border-violet-500 flex-grow"></span>
               <span className="mx-2 text-violet-500 dark:text-white">o</span>
               <span className="border-t border-violet-500 flex-grow"></span>
             </div>

             <a
               href="/"
               className="underline w-fit mb-4 text-violet-500 dark:text-white"
             >
               Continua como invitado
             </a>
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
 );
}

export default Register;