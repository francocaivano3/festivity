import { useState, useEffect } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Trash2 } from "lucide-react";
import environment from "../../utils/environment";

const EditOrganizerModal = ({isModalOpen, setIsModalOpen, organizerToEdit, setAlert}) => {
    const [organizerData, setOrganizerData] = useState({
        Id: Number(organizerToEdit.id),
        Name: organizerToEdit.name,
        Email: organizerToEdit.email,
        Password: organizerToEdit.password,
        Phone: organizerToEdit.phone
    });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        if(organizerToEdit) {
            setOrganizerData({
                Id: organizerToEdit.id || '',
                Name: organizerToEdit.name || '',
                Email: organizerToEdit.email || '',
                Password: organizerToEdit.password || '',
                Phone: organizerToEdit.phone || ''
            })
        }
    }, []);
    
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const handleDelete = () => {
        setIsConfirmOpen(true);
    };

    const confirmDeletion = async () => {
        setIsConfirmOpen(false);
        if (localStorage.getItem("authToken")) {
            try {
                const response = await fetch(`${environment.backendUrl}/api/EventOrganizer/${organizerData.Id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
                    }
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete organizer`);
                }
                setIsModalOpen(false);
                setAlert({ message: "El organizador ha sido borrado con éxito!", type: "success" });
                setTimeout(() => {
                   window.location.reload(); 
                }, 2500);
                
            } catch (e) {
                setIsModalOpen(false);
                setAlert({ message: "Ha ocurrido un error!", type: "error" });
                setTimeout(() => {
                    window.location.reload(); 
                }, 2500);
            }
        }
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setOrganizerData((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!organizerData.Name || !organizerData.Email || !organizerData.Password || !organizerData.Phone) {
            setAlert({ message: "Todos los campos son obligatorios.", type: "error" });
            setIsModalOpen(false);
            setTimeout(() => {
                setAlert({ message: "", type: "" });
              }, 3000);
            return;
        }

        if (!validateEmail(organizerData.Email)) {
            setAlert({ message: "Ingrese un email válido.", type: "error" });
            setIsModalOpen(false);
            setTimeout(() => {
                setAlert({ message: "", type: "" });
              }, 3000);
            return;
        }


        try {
            const url = `${environment.backendUrl}/api/EventOrganizer/UpdateOrganizer/${organizerData.Id}`;
            const method = "PUT";
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(organizerData)
            });

            
            if(!response.ok){
                const errorData = await response.json(); 
                setAlert({ message: `Error: ${errorData.message || 'Ha ocurrido un error!'}`, type: "error" });
                throw new Error("Failed to update organizer");
            }

            setAlert({ message: "El organizador ha sido actualizado!", type: "success" });
            setIsModalOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch(e) {
            console.log(e);
            setAlert({ message: "Error al actualizar el organizador!", type: "error" });
            setIsModalOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    return (
      <>
        {isConfirmOpen && (
          <ConfirmDialog
            open={isConfirmOpen}
            message="¿Estás seguro de que quieres eliminar este organizador?"
            onConfirm={confirmDeletion}
            onClose={() => setIsConfirmOpen(false)}
          />
        )}

        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-[#1f1f1f] rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[90vh] h-auto p-6 flex-col items-end relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              ✖ 
            </button>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ">
                <div>
                  <label htmlFor="Name" className="dark:text-violet-500">
                    Nombre del Organizador
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    defaultValue={organizerData.Name}
                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                    placeholder="Juan Pérez"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="Email" className="dark:text-violet-500">
                    Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    defaultValue={organizerData.Email}
                    placeholder="juanperez@gmail.com"
                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="Password" className="dark:text-violet-500">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="Password"
                    id="Password"
                    defaultValue={organizerData.Password}
                    placeholder="********"
                    className="block w-full rounded-md size-10 bg-gray-200 pl-4 border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="Phone" className="dark:text-violet-500">
                    Teléfono
                  </label>
                  <input
                    id="Phone"
                    type="tel"
                    name="Phone"
                    defaultValue={organizerData.Phone}
                    placeholder="3412345678"
                    className="bg-gray-200 pl-4 w-full size-10 rounded-md border-2 border-gray-300 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-16">
                <button
                  type="button"
                  className="bg-[#9b3d3d] text-white rounded-lg px-4 py-2 flex hover:bg-[#be3232]"
                  onClick={handleDelete}
                >
                  Borrar organizador <Trash2 className="ml-2" />
                </button>
                <div className="space-x-4">
                  <button
                    className="bg-[#7b7b86] text-white rounded-lg px-4 py-2 hover:bg-[#3a3a3f]"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#6366f1] text-white rounded-lg px-4 py-2 hover:bg-[#31339b] dark:bg-violet-600 dark:hover:bg-violet-700"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default EditOrganizerModal;