import { ArrowLeft, MoreVertical, Bell, Clock, Download } from "lucide-react"

const Ticket = ({event}) => {
    return (
        <div className="bg-black text-white rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                        {event.name}  
                    </div>
                    <div className="text-sm sm:text-base text-gray-400">
                        {event.city}, {event.address}
                    </div>
                </div>
                <div className="text-right mt-4 sm:mt-0">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{event.price}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm sm:text-base border-t border-gray-800 pt-6">
                <div>
                    <div className="text-gray-400">Fecha</div>
                    <div className="font-semibold mt-1">{event.date}</div>
                </div>
                <div>
                    <div className="text-gray-400">Hora</div>
                    <div className="font-semibold mt-1">{event.date}</div>
                </div>
            </div>
        </div>
    )
}

export default Ticket;