import {Trash2} from "lucide-react";
import { useState, useEffect } from "react";
import environment from "../../utils/environment";
import { useNavigate } from "react-router-dom";

const EditEventModal = ({isModalOpen, setIsModalOpen, eventToEdit}) => {
    const [eventData, setEventData] = useState({
        Id: Number(eventToEdit.id),
        Name: eventToEdit.name,
        Address: eventToEdit.address,
        City: eventToEdit.city,
        Date: eventToEdit.date,
        Category: eventToEdit.category,
        Price: eventToEdit.price
    });

    useEffect(() => {
        if(eventToEdit) {
            setEventData({
                Id: eventToEdit.id || '',
                Name: eventToEdit.name || '',
                Address: eventToEdit.address || '',
                City: eventToEdit.city || '',
                Date: eventToEdit.date || '',
                Category: eventToEdit.category || '',
                Price: Number(eventToEdit.price) || ''
            })
        }
    }, []);

    const handleDelete = async () => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this event?");
        console.log("event to delete: ", eventData);
        if(confirmDeletion && localStorage.getItem("authToken")){
            try {
                const response = await fetch(`${environment.backendUrl}/api/Events/${eventData.Id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
                    }
                });
                console.log("RESPONSE: ", JSON.stringify(response));
                if(!response.ok){
                    throw new Error(`Failed to delete event`);
                }
                alert("Event deleted successfully");
                window.location.reload();
            } catch(e) {
                console.error("Error deleting event: ", e);
                alert("Error deleting event");
            }
        }
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const url = `${environment.backendUrl}/update-event`;
            const method = "PUT";
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
            });
            console.log(`RESPONSE: ${response}`);
            console.log('Event data to be sent:', eventData);
            if(!response.ok){
                const errorData = await response.json(); 
                console.error('Error response:', errorData);  
                alert(`Error: ${errorData.message || 'An error occurred'}`);
                throw new Error("Failed to update event");
            }

            alert("Event succesfully updated");
            navigate("/my-events");
        } catch(e) {
            console.error("Error submitting event");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg w-1/2 h-2/3 p-6 flex-col items-end relative">
                <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        onClick={() => setIsModalOpen(false)}
                >
                    ✖
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="Name">Nombre del Evento</label>
                            <div className="mt-2.5">
                                <input 
                                 type="text"
                                 name="Name"
                                 id="Name"
                                 defaultValue={eventData.Name}
                                 className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                                 placeholder="Ingrese el nombre del evento" onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Address">Dirección</label>
                            <div className="mt-2.5">
                                <input 
                                 type="text"
                                 name="Address"
                                 id="Address"
                                 defaultValue={eventData.Address}
                                 placeholder="Ingrese la dirección del evento"
                                 className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none" onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="City">Ciudad</label>
                            <div className="mt-2.5">
                                <input 
                                 type="text"
                                 name="City"
                                 id="City"
                                 defaultValue={eventData.City}
                                 placeholder="Ingrese la ciudad del evento"
                                 className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none" onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Date">Fecha</label>
                            <div className="mt-2.5">
                                <input id="Date" type="datetime-local" name="Date" defaultValue={eventData.Date} placeholder="Ingrese la fecha del evento" className="bg-gray-200 pl-4 w-full size-10 rounded-md border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none" onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Category">Categoría</label>
                            <div className="mt-2.5">
                                <input id="Category" type="text" name="Category" defaultValue={eventData.Category} placeholder="Ingrese la categoría del evento" className="bg-gray-200 pl-4 w-full size-10 rounded-md border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none" onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Price">Precio</label>
                            <div className="mt-2.5">
                                <input id="Price" type="number" name="Price" defaultValue={eventData.Price} placeholder="Ingrese el precio del evento" className="bg-gray-200 pl-4 w-full size-10 border-2 rounded-md border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none" onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                <div className="flex justify-between mt-16">
                    <button type="button" className="bg-[#9b3d3d] text-white rounded-lg px-4 py-2 flex hover:bg-[#be3232]" onClick={handleDelete}>
                        Borrar evento <Trash2 className="ml-2"/>
                    </button>
                    <div className="space-x-4">
                        <button className="bg-[#7b7b86] text-white rounded-lg px-4 py-2 hover:bg-[#3a3a3f]" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="bg-[#6366f1] text-white rounded-lg px-4 py-2 hover:bg-[#31339b]">
                            Guardar Cambios
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default EditEventModal;