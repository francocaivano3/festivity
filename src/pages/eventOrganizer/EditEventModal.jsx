    import {Trash2} from "lucide-react";
    import { useState, useEffect } from "react";
    import environment from "../../utils/environment";
    import { useNavigate } from "react-router-dom";
    import ConfirmDialog from "../../components/ConfirmDialog";

    const EditEventModal = ({isModalOpen, setIsModalOpen, eventToEdit, setAlert}) => {
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

        const [isConfirmOpen, setIsConfirmOpen] = useState(false);

        
    const handleDelete = () => {
        setIsConfirmOpen(true);
    };

    const confirmDeletion = async () => {
        setIsConfirmOpen(false);
        if (localStorage.getItem("authToken")) {
            try {
                const response = await fetch(`${environment.backendUrl}/api/Events/${eventData.Id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
                    }
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete event`);
                }
                setIsModalOpen(false);
                setAlert({ message: "El evento ha sido borrado con éxito!", type: "success" });
                setTimeout(() => {
                   window.location.reload(); 
                }, 3500);
                
            } catch (e) {
                setAlert({ message: "Ha ocurrido un error!", type: "error" });
                console.error("flsadjlfaj")
            }
        }
    };

    const handleCancel = () => {
        console.log("alnflsad");
        setIsConfirmOpen(false);
    }

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
                
                if(!response.ok){
                    const errorData = await response.json(); 
                    setAlert({ message: `Error: ${errorData.message || 'Ha ocurrido un error!'}`, type: "error" });
                    throw new Error("Failed to update event");
                }

                setAlert({ message: "El evento ha sido actualizado!", type: "success" });
                setIsModalOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch(e) {
                setAlert({ message: "Error al actualizar el evento!", type: "error" });
            }
        };

        return (
            <>
            {isConfirmOpen && (
                <ConfirmDialog
                    open={isConfirmOpen}
                    message="¿Estás seguro de que quieres eliminar este evento?"
                    onConfirm={confirmDeletion}
                    onClose={() => setIsConfirmOpen(false)}
                />
            )}
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
                                <input 
                                    type="text"
                                    name="Name"
                                    id="Name"
                                    defaultValue={eventData.Name}
                                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                                    placeholder="Ingrese el nombre del evento"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="Address">Dirección</label>
                                <input 
                                    type="text"
                                    name="Address"
                                    id="Address"
                                    defaultValue={eventData.Address}
                                    placeholder="Ingrese la dirección del evento"
                                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="City">Ciudad</label>
                                <input 
                                    type="text"
                                    name="City"
                                    id="City"
                                    defaultValue={eventData.City}
                                    placeholder="Ingrese la ciudad del evento"
                                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="Date">Fecha</label>
                                <input 
                                    id="Date"
                                    type="datetime-local"
                                    name="Date"
                                    defaultValue={eventData.Date}
                                    className="bg-gray-200 pl-4 w-full size-10 rounded-md border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="Category">Categoría</label>
                                <input 
                                    id="Category"
                                    type="text"
                                    name="Category"
                                    defaultValue={eventData.Category}
                                    className="bg-gray-200 pl-4 w-full size-10 rounded-md border-2 border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="Price">Precio</label>
                                <input 
                                    id="Price"
                                    type="number"
                                    name="Price"
                                    defaultValue={eventData.Price}
                                    className="bg-gray-200 pl-4 w-full size-10 border-2 rounded-md border-gray-300 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                                    onChange={handleChange}
                                />
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
        </>
        )
    }

    export default EditEventModal;