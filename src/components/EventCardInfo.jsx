import React from 'react';
const cardsTitles = ["Ingresos totales", "Tickets vendidos", "Eventos activos"];
const EventCardInfo = ({eventInfo, index, available}) => {
    const earnings = eventInfo.Sold * eventInfo.Price;
    const sold = eventInfo.Sold;
    return (
        <div className='bg-black rounded-xl text-white' key={eventInfo.Id}>
            <h2>{cardsTitles[index]}</h2>
            {index === 0 && <p>{earnings}</p>}
            {index === 1 && <p>{sold}</p>}
            {index === 2 && <p>{available}</p>}
        </div>
    )
}

export default EventCardInfo;