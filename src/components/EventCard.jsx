import { MapPin, CalendarIcon as Calendar1, CircleDollarSign, Clock } from "lucide-react";
import Event from "../assets/Event.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { buyTicket } from "../utils/fetch";

const EventCard = ({ alert,setAlert,
  EventId,
  Name,
  Address,
  City,
  Day,
  availableTickets,
  Category,
  Price,
  role
}) => {
  const day = new Date(Day).toLocaleDateString();
  const hour = new Date(Day).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  
 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiration: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = "Número de tarjeta inválido";
    }

    if (!formData.cardName) {
      newErrors.cardName = "Ingrese el nombre del titular de la tarjeta";
    }

    if (!formData.expiration.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiration = "Fecha de expiración inválida (MM/YY)";
    }
                                
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "CVV inválido (3 carácteres)"; 
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, eventId) => {
    e.preventDefault();
    if (validateForm()) {
          try {
            const response = await buyTicket(eventId);
            if (response.success) {
              setAlert({
                message: "Compra realizada con éxito",
                type: "success",
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsModalOpen(false);
              setFormData({
                cardNumber: "",
                cardName: "",
                expiration: "",
                cvv: "",
              });
              setErrors({});
              setTimeout(() => {
                navigate("/my-tickets");
              }, 3000);
            } else {
              setIsModalOpen(false);
              setAlert({
                message: "Error al comprar el ticket",
                type: "error",
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsModalOpen(false);
              setTimeout(() => {
                setAlert({});
              }, 3000);
              
            }
          } catch (e) {
            setAlert({
              message: "Error en la compra del ticket, inténtelo nuevamente!",
              type: "error",
            });
            
        }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    setFormData((prev) => ({
      ...prev,
      expiration: value,
    }));
  };

  const handleModalToggle = () => {
    const today = new Date();
    const actualHour = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    if (availableTickets === 0) {
      setAlert({
        message: "Evento Agotado! 🚫",
        type: "error",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsModalOpen(false);
      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    } else {
      if (!isModalOpen) {
        setIsModalOpen(true);
      }
    }
     if (today < Day) {
      if (!isModalOpen) {
        setIsModalOpen(true);
      }
    } else if (today === Day && actualHour < hour) {
      if (!isModalOpen) {
        setIsModalOpen(true);
      }
    } else {
      setAlert({
        message: "Evento en curso o expirado",
        type: "error",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsModalOpen(false);
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
    
  };

  useEffect(() => {
    const originalStyle = document.body.style.overflow;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isModalOpen]);

  const expiration = () => {
    const today = new Date();
    const day = new Date(Day);
    const actualHour = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    const todayStr = getYMD(today);
    const dayStr = getYMD(day);

    if (todayStr < dayStr) {
      return true;
    } else if (todayStr === dayStr && actualHour < hour) {
      return true;
    } else {
      return false;
    }
  }
  
  const getYMD = (date) => {
  return date.toISOString().split("T")[0].replace(/-/g, "/");
};

  return (
    <div className="flex justify-center p-6">
      <div className="bg-white dark:bg-[#1f1f1f] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl w-full max-w-xl">
        <img
          src={Event || "/placeholder.svg"}
          alt=""
          className="rounded-t-2xl w-full h-56 object-cover"
        />
        <div className="p-6">
          <h2 className="font-bold text-xl text-indigo-600 hover:text-indigo-800 dark:text-gray-200 uppercase">
            {Name}
          </h2>
          <h3 className="text-sm text-gray-500 mb-4 dark:text-gray-300">
            {Category}
          </h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-center text-sm">
              <MapPin className="text-indigo-500 dark:text-violet-600 mr-2 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-200">
                {City}, {Address}
              </p>
            </div>

            <div className="flex items-center text-sm">
              <Calendar1 className="mr-2 text-indigo-500 dark:text-violet-600 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-200">Fecha: {day}</p>
            </div>

            <div className="flex items-center text-sm">
              <Clock className="mr-2 text-indigo-500 dark:text-violet-600 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-200">Hora: {hour}</p>
            </div>

            <div className="flex items-center text-sm">
              <CircleDollarSign className="mr-2 text-indigo-500 dark:text-violet-600 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-200">
                Precio: ${Price}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <span
              className={`${
                availableTickets > 0 && expiration()
                  ? "bg-green-300 text-green-800 dark:text-white dark:bg-green-500 "
                  : "bg-red-300 text-red-800"
              } p-2 rounded-xl text-xs w-full sm:w-auto text-center`}
            >
              {availableTickets > 0 && expiration() ? "Disponible" : expiration() ? "Expirado" : "Agotado"}
            </span>
            {role === "EventOrganizer" ? (
              <button
                className="bg-gradient-to-r from-indigo-400 to-violet-500 px-4 py-2 rounded-lg text-white dark:text-black text-xs w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/organizer")}
              >
                Editar
              </button>
            ) : availableTickets >= 0 && role === "Client" ? (
              <button
                className="bg-gradient-to-r from-indigo-400 to-violet-500 px-4 py-2 rounded-lg text-white dark:text-black text-xs w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
                onClick={handleModalToggle}
              >
                Comprar
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-indigo-400 to-violet-500 px-4 py-2 rounded-lg text-white dark:text-black text-xs w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
                onClick={
                  role !== "Invitado" ? () => null : () => navigate("/login")
                }
              >
                Comprar
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg w-3/4 md:w-1/2 h-auto p-6 flex-col items-end relative dark:bg-[#1f1f1f]">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <form
              onSubmit={(e) => handleSubmit(e, EventId)}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-violet-500"
                >
                  Número de tarjeta
                </label>
                <input
                  type="number"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  maxLength={16}
                  onChange={handleChange}
                  className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                />
                {errors.cardNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.cardNumber}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium text-gray-700 dark:text-violet-500"
                >
                  Nombre en la tarjeta
                </label>
                <input
                  type="text"
                  name="cardName"
                  id="cardName"
                  placeholder="Nombre Apellido"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                />
                {errors.cardName && (
                  <span className="text-red-500 text-sm">
                    {errors.cardName}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiration"
                    className="block text-sm font-medium text-gray-700 dark:text-violet-500"
                  >
                    Expiración
                  </label>
                  <input
                    type="text"
                    name="expiration"
                    id="expiration"
                    placeholder="MM/YY"
                    value={formData.expiration}
                    onChange={handleExpirationChange}
                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                  />
                  {errors.expiration && (
                    <span className="text-red-500 text-sm">
                      {errors.expiration}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 dark:text-violet-500"
                  >
                    CVV
                  </label>
                  <input
                    type="number"
                    name="cvv"
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                  />
                  {errors.cvv && (
                    <span className="text-red-500 text-sm">{errors.cvv}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#8366f1] text-white rounded-lg px-4 py-2 hover:bg-[#42339b]"
                >
                  Comprar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
