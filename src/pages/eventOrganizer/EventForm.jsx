import { useState, useEffect } from "react";
import environment from "../../utils/environment";
import Sidebar from "../../components/Sidebar";
import {Text} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import background from "../../assets/background.png";

const EventForm = () => {
  const token = localStorage.getItem("authToken");
  const id = jwtDecode(token).NameIdentifier;

  const [eventData, setEventData] = useState({
    Name: "",
    Address: "",
    City: "",
    Date: "",
    NumberOfTickets: 0,
    Category: "",
    Price: 0.0,
    EventOrganizerId: id,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${environment.backendUrl}/create-event`;
      const method = "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.status}`);
      }
    } catch (e) {
      console.error("Error submitting event");
    }
  };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }


return (
    <div className="flex-1 min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${background})`}}>
      <div className="flex p-4">
        {isSidebarOpen && <Sidebar />}
        {isSidebarOpen && (
          <button className="z-50" onClick={toggleSidebar}>
            <Text className="h-8 w-8 hover:scale-110 transition-all" />
          </button>
        )}
        <button onClick={toggleSidebar}>
          <Text className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-white" />
        </button>
        <h1
          className={
            isSidebarOpen
              ? "text-3xl font-bold text-white ml-40"
              : "text-3xl font-bold text-white"
          }
        >
          Crear evento
        </h1>
        </div>
        <div className="flex justify-center items-center w-2/4 mx-auto">

        <form onSubmit={handleSubmit} className="bg-white p-16 w-full space-y-4 mb-10 rounded-xl">
            <div className="space-y-2">
                <label htmlFor="Name">Nombre</label>
                <br />
                <input className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black" type="text" name="Name" value={eventData.Name} onChange={handleChange} placeholder="Ingrese el nombre del evento" />
            </div>
            <div className="space-y-2">
                <label htmlFor="Address">Dirección</label>
                <br />
                <input className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black" type="text" name="Address" value={eventData.Address} onChange={handleChange} placeholder="Ingrese la dirección del evento" />
            </div>
            <div className="space-y-2">
                <label htmlFor="City">Ciudad</label>
                <br />
                <input className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black" type="text" name="City" value={eventData.City} onChange={handleChange} placeholder="Ingrese la ciudad del evento" />
            </div>
            <div className="space-y-2">
                <label htmlFor="Date">Fecha</label>
                <br />
                <input className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black" type="datetime-local" name="Date" value={eventData.Date} onChange={handleChange} placeholder="Ingrese la fecha del evento"/>
            </div>
            <div className="space-y-2">
                <label htmlFor="NumberOfTickets">Número de tickets</label>
                <br />
                <input className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black" type="number" name="NumberOfTickets" value={eventData.NumberOfTickets} onChange={handleChange} placeholder="Ingrese el número de tickets" />
            </div>
            <div className="space-y-2">
                <label htmlFor="Category">Categoría</label>
                <br />
                <input className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black" type="text" name="Category" value={eventData.Category} onChange={handleChange} placeholder="Ingrese la categoría del evento" />
            </div>
            <div className="space-y-2">
                <label htmlFor="Price">Precio</label>
                <br />
                <input className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black" type="number" name="Price" value={eventData.Price} onChange={handleChange} placeholder="Ingrese el precio de las entradas" />
            </div>

            <button className="px-6 py-2 bg-violet-500 hover:scale-105 rounded-lg text-white" type="submit">Crear evento</button>
        </form>
        </div>
    </div>
  );
};

export default EventForm;