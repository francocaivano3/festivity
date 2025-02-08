import errorImg from "../assets/vecteezy_3d-error-404-for-landing-page_24584237.webp"
import { Navigate, useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row justify-around items-center w-full min-h-screen">
            <img src={errorImg} className="w-1/3 h-1/3 mx-auto" alt="Error 404: Página no encontrada" />
            <div className="flex flex-col w-1/2 min-h-screen justify-center items-center">
                <h1 className="w-fit mx-auto text-3xl mb-8">PÁGINA NO ENCONTRADA</h1>
                <button className="bg-[#6366f1] px-8 py-3 rounded-md text-white" onClick={() => navigate("/organizer")}>Volver</button>
            </div>
        </div>
    )
}

export default Error;