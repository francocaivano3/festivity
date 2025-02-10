import errorImg from "../assets/errorImg.jpg";
import { Navigate, useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row justify-around items-center w-full min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${errorImg})`}}>
            <div className="flex flex-col w-1/2 min-h-screen justify-center items-center">
                <h1 className="w-fit mx-auto text-8xl mb-4 text-[#6366f1]">404</h1>
                <p className="mb-8 text-md sm:text-2xl text-[#323499]">PÁGINA NO ENCONTRADA</p>
                <button className="bg-[#6366f1] hover:bg-[#323499] px-8 py-3 rounded-md text-white" onClick={() => navigate(history.back())}>Volver</button>
            </div>
        </div>
    )
}

export default Error;