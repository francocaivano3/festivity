import { useState, useEffect } from "react";
import environment from "../../utils/environment";
import Sidebar from "../../components/Sidebar";
import {AlignLeft} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import background from "../../assets/background.png";
import { useNavigate } from "react-router-dom";
const EventForm = () => {
  const token = localStorage.getItem("authToken");
  const id = token ? jwtDecode(token).NameIdentifier : null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [alert, setAlert] = useState({message: "", type: ""});
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(eventData.Date);
    const now = new Date();

    if (!eventData.Date || selectedDate <= now) {
      setAlert({ message: "La fecha debe ser futura y válida.", type: "error" });
      return;
    }

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
          let errorMessage = "Ha ocurrido un error! Revise los campos";
          try{
              const errorData = await response.json(); 
              errorMessage = errorData.message || errorMessage;
          } catch(_) {
              throw new Error(errorMessage);
          }
          setAlert({ message: "Error al crear evento. Revise los campos", type: "error" });
          return;
        }
        setAlert({ message: "El evento se ha creado con éxito!", type: "success" });
        setTimeout(() => {
            navigate("/organizer");
        }, 2000);
  
      } catch (e) {
        setAlert({ message: e.message, type: "error" });
      }
  };


    const toggleSidebar = () => {
      if(!isSidebarOpen) {
          document.body.classList.add("overflow-hidden");
      } else {
          document.body.classList.remove("overflow-hidden");
      }
        setIsSidebarOpen(!isSidebarOpen);
    }


return (
  <div className="flex-1 min-h-screen bg-cover bg-center bg-event-form">
    {isSidebarOpen && (
      <div className="fixed inset-0 z-40" onClick={toggleSidebar} />
    )}
    <div className="flex p-4">
      {isSidebarOpen && <Sidebar />}
      {isSidebarOpen && (
        <button className="z-50" onClick={toggleSidebar}>
          <AlignLeft className="h-8 w-8 hover:scale-110 transition-all dark:text-white" />
        </button>
      )}
      <button onClick={toggleSidebar}>
        <AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-white dark:text-violet-300" />
      </button>
      <h1
        className={
          isSidebarOpen
            ? "text-3xl font-bold text-white ml-40"
            : "text-3xl font-bold text-white dark:text-violet-400"
        }
      >
        Crear evento
      </h1>
    </div>

    <div className="flex justify-center items-center w-3/4 sm:w-3/5 mx-auto ">
      <form
        onSubmit={handleSubmit}
        className={
          isSidebarOpen
            ? `bg-white p-16 w-full space-y-4 mb-10 ml-12 rounded-xl blur-sm dark:bg-[#1f1f1f] dark:text-white`
            : `bg-white p-16 w-full space-y-4 mb-10 rounded-xl dark:bg-[#1f1f1f] dark:text-white`
        }
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="Name">Nombre</label>
            <br />
            <input
              className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
              type="text"
              name="Name"
              value={eventData.Name}
              onChange={handleChange}
              placeholder="Ingrese el nombre del evento"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Address">Dirección</label>
            <br />
            <input
              className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
              type="text"
              name="Address"
              value={eventData.Address}
              onChange={handleChange}
              placeholder="Ingrese la dirección del evento"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="City">Ciudad</label>
            <br />
            <input
              className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
              type="text"
              name="City"
              value={eventData.City}
              onChange={handleChange}
              placeholder="Ingrese la ciudad del evento"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Date">Fecha</label>
            <br />
            <input
              className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
              type="datetime-local"
              name="Date"
              value={eventData.Date}
              onChange={handleChange}
              placeholder="Ingrese la fecha del evento"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="NumberOfTickets">Número de tickets</label>
            <br />
            <input
              min="1"
              className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
              type="number"
              name="NumberOfTickets"
              value={eventData.NumberOfTickets}
              onChange={handleChange}
              placeholder="Ingrese el número de tickets"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Category">Categoría</label>
            <br />
            <input
              className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
              type="text"
              name="Category"
              value={eventData.Category}
              onChange={handleChange}
              placeholder="Ingrese la categoría del evento"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="Price">Precio</label>
          <br />
          <input
            min="0"
            step="1"
            className="w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
            type="number"
            name="Price"
            value={eventData.Price}
            onChange={handleChange}
            placeholder="Ingrese el precio de las entradas"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="px-6 py-2 bg-[#6361f1] hover:scale-105 rounded-lg text-white mt-4"
            type="submit"
            onClick={() => handleSubmit}
          >
            Crear evento
          </button>
          {alert.message && (
            <div
              className={`alert ${
                alert.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white p-3 rounded-md`}
            >
              {alert.message}
            </div>
          )}
        </div>
      </form>
    </div>
  </div>
);
};

export default EventForm;