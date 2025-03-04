import errorImg from "../assets/errorImg.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
const Error = ({errorNum}) => {
    const navigate = useNavigate();
    const [role, setRole] = useState("Invitado");

    useEffect(() => {
        const tokenString = localStorage.getItem("authToken");
        if(tokenString){
            try {
                const decoded = jwtDecode(tokenString);
                setRole(decoded.Role || "Invitado");
            } catch (e) {
                console.error("Error al decodificar el token: ", e);
            }
        }
    }, []);

    const goBack = () => {
        if(role === "EventOrganizer"){
            navigate("/organizer");
        } else if(role === "Client"){
            navigate("/client");
        } else if(role === "SuperAdmin"){
            navigate("/superadmin");
        } else {
            navigate("/login");
        }
    }
    

    return (
        <div className="flex flex-row justify-around items-center w-full min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${errorImg})`}}>
            <div className="flex flex-col w-1/2 min-h-screen justify-center items-center">
                <h1 className="w-fit mx-auto text-8xl mb-4 text-[#6366f1]">{errorNum}</h1>
                <p className="mb-8 text-md sm:text-2xl text-[#323499]">{errorNum === 404 ? "PÁGINA NO ENCONTRADA" : "NO TIENES AUTORIZACIÓN SUFICIENTE"}</p>
                <button id="button" className="bg-[#323499] hover:bg-[#6366f1] px-8 py-3 rounded-md text-white" onClick={() => goBack()}>Volver</button>
            </div>
        </div>
    )
}

export default Error;