import { MapPin, CalendarIcon as Calendar1, CircleDollarSign, Clock } from "lucide-react";
import Event from "../assets/Event.jpg";
import { useNavigate } from "react-router-dom";

const EventCard = ({ Name, Address, City, Day, NumberOfTickets, Category, Price, role }) => {
  const day = new Date(Day).toLocaleDateString()
  const hour = new Date(Day).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const navigate = useNavigate()

  return (
    <div className="flex justify-center p-6">
      <div className="bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-3xl w-full max-w-xl">
        <img src={Event || "/placeholder.svg"} alt="" className="rounded-t-3xl w-full h-56 object-cover" />
        <div className="p-6">
          <h2 className="font-bold text-xl text-indigo-600 hover:text-indigo-800">{Name}</h2>
          <h3 className="text-sm text-gray-500 mb-4">{Category}</h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-center text-sm">
              <MapPin className="text-indigo-500 mr-2 flex-shrink-0" />
              <p className="text-gray-700">{City}, {Address}</p>
            </div>

            <div className="flex items-center text-sm">
              <Calendar1 className="mr-2 text-indigo-500 flex-shrink-0" />
              <p className="text-gray-700">Fecha: {day}</p>
            </div>

            <div className="flex items-center text-sm">
              <Clock className="mr-2 text-indigo-500 flex-shrink-0" />
              <p className="text-gray-700">Hora: {hour}</p>
            </div>

            <div className="flex items-center text-sm">
              <CircleDollarSign className="mr-2 text-indigo-500 flex-shrink-0" />
              <p className="text-gray-700">Precio: ${Price}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <span
              className={`${
                NumberOfTickets > 0
                  ? "bg-green-200 text-green-800"
                  : "bg-red-300 text-red-800"
              } p-2 rounded-xl text-xs w-full sm:w-auto text-center`}
            >
              {NumberOfTickets > 0 ? "Disponible" : "Agotado"}
            </span>
            {NumberOfTickets > 0 && role === "Organizer" && (
              <button
                className="bg-gradient-to-r from-indigo-400 to-violet-500 px-4 py-2 rounded-lg text-white text-xs w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/organizer")}
              >
                Editar
              </button>
            )}
            {NumberOfTickets > 0 && role === "Client" && (
              <button
                className="bg-gradient-to-r from-indigo-400 to-violet-500 px-4 py-2 rounded-lg text-white text-xs w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/event-details")}
              >
                Comprar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
