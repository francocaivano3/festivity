const Ticket = ({event}) => {
    const day = new Date(event.date).toLocaleDateString()
    const hour = new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return (
      <div
        id="ticket-container"
        className="w-4/5 md:w-3/4 text-white rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-center mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
              {event.eventName}
            </div>
            <div className="text-sm sm:text-base text-center sm:text-left text-gray-300 mb-4 md:mb-0">
              {event.city}, {event.address}
            </div>
          </div>
          <div className="text-right mt-4 sm:mt-0 bg-[#6d28d9] p-4 rounded-xl">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              ${event.amount}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 text-sm sm:text-base border-t border-gray-900 pt-6 text-center">
          <div>
            <div className="text-gray-200">Fecha</div>
            <div className="font-semibold mt-1">{day}</div>
          </div>
          <div>
            <div className="text-gray-200">Hora</div>
            <div className="font-semibold mt-1">{hour}</div>
          </div>
          <div>
            <div className="text-gray-200">Categoría</div>
            <div className="font-semibold mt-1">Temática</div>
          </div>
          <div>
            <div className="text-gray-200">ID</div>
            <div className="font-semibold mt-1">{event.id}</div>
          </div>
        </div>
      </div>
    );
}

export default Ticket;