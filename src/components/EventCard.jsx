import { MapPin, Calendar1, Ticket, CircleDollarSign, Clock } from "lucide-react";
import Event  from "../assets/Event.jpg";
import { useNavigate } from "react-router-dom";

const EventCard = ({Name, Address, City, Day, NumberOfTickets, Category, Price}) => {
    const day = new Date(Day).toLocaleDateString();
    const hour = new Date(Day).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const navigate = useNavigate();

    return (
    <div className="flex-1 justify-center bg-white shadow-lg hover:scale-105 transition-all duration-400 rounded-2xl h-fit">
            <img src={Event} alt="" className="rounded-t-2xl h-3/5 w-full"/>
            <h2 className="font-bold mt-4 ml-4">{Name}</h2>
            <h3 className="ml-4">{Category}</h3>
            <div className="flex mt-2">
                <MapPin className="text-gray-800 mr-2 ml-4"/>
                <p className="text-gray-700">{City}, {Address}</p>
            </div>
            <div className="flex ml-4 mt-2"><Calendar1 className="mr-2 text-gray-800"/><p className="text-gray-700">Fecha: {day}</p></div>
            <div className="flex ml-4 mt-2"><Clock className="mr-2 text-gray-800"/><p className="text-gray-700">Hora: {hour}</p></div>
            <div className="flex ml-4 mt-2"><CircleDollarSign className="mr-2 text-gray-800"/><p className="text-gray-700">Precio: ${Price}</p></div>
            <div className="my-6 ml-4 flex gap-4">
                <span className={NumberOfTickets > 0 ? "bg-green-200 p-2 rounded-xl text-green-800" : "bg-red-300 p-2 rounded-xl text-red-800"}>{NumberOfTickets > 0 ? "Disponible" : "Agotado"}</span>
                <button className="bg-gradient-to-r from-indigo-400 to-violet-500 px-4 rounded-lg">Ver más</button>
            </div>
    </div>)
}

export default EventCard;