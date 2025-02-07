

const EditEventModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg w-1/2 h-3/4 p-6 flex-col items-end">
                <form>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="Name">Nombre del Evento</label>
                            <div className="mt-2.5">
                                <input 
                                 type="text"
                                 name="Name"
                                 id="Name"
                                 className="block w-full rounded-md size-10 border-0 bg-gray-200 pl-4" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Address">Dirección</label>
                            <div className="mt-2.5">
                                <input 
                                 type="text"
                                 name="Address"
                                 id="Address"
                                 className="block w-full rounded-md size-10 border-0 bg-gray-200 pl-4" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="City">Ciudad</label>
                            <div className="mt-2.5">
                                <input 
                                 type="text"
                                 name="City"
                                 id="City"
                                 className="block w-full rounded-md size-10 border-0 bg-gray-200 pl-4" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Date">Fecha</label>
                            <div className="mt-2.5">
                                <input id="Date" type="datetime-local" name="Date" placeholder="Ingrese la fecha del even10o" className="bg-gray-200 pl-4 w-full" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Category">Categoría</label>
                            <div className="mt-2.5">
                                <input id="Category" type="text" name="Category" placeholder="Ingrese la categoría del even10o" className="bg-gray-200 pl-4 w-full" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Price">Precio</label>
                            <div className="mt-2.5">
                                <input id="Price" type="text" name="Price" placeholder="Ingrese el precio del even10o" className="bg-gray-200 pl-4 w-full" />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="flex justify-center mt-8">
                    <button className="bg-[#6366f1] text-white rounded-lg px-4 py-2">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditEventModal;