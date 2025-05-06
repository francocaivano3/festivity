import environment from "./environment";

export const fetchData = async (endpoint, params = {}, requiresAuth = true) => {
    try {
        const url = new URL(`${environment.backendUrl}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const headers = {};

        if(requiresAuth) {
            headers.authorization = `Bearer ${localStorage.getItem("authToken")}`;
        }

        const response = await fetch(url, { method: "GET", headers });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}`);
        }

        return await response.json();

    } catch (error) {
        console.error(`Error while fetching ${endpoint}:`, error);
        return null;
    };
}

export const fetchEvents = async() => {
    return await fetchData("/api/Events/organizer/events");
}

// export const soldTickets = async (eventId) => {
//     return await fetchData("/api/Events/organizers/events/event/tickets/sold", { eventId });
// }

export const fetchAllEvents = async() => {
    return await fetchData("/api/Client/get-all-events");
}

export const fetchAllMyTickets = async() => {
    return await fetchData("/api/Client/client/get-tickets");
}

export const buyTicket = async (eventId) => {
    try {
        const response = await fetch(`${environment.backendUrl}/events/event/${eventId}/buy-ticket`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
                "Content-Type": "application/json"
            }
        });

        console.log(response);

        if(!response.ok){
            const errorMessage = await response.text(); 
            throw new Error(`Error al comprar el ticket: ${errorMessage}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error al comprar el ticket: ", error);
        return {success: false, message: error.message};
    }
}

export const fetchSold = async (eventId) => {
    return await fetchData(`/api/Events/organizers/events/event/tickets/sold/${eventId}`);
}

export const fetchAvailableAllTickets = async () => {
  return await fetchData(`/events/event/ticket/available`);
}

export const fetchAvailableTickets = async () => {
  return await fetchData(
    `/api/Events/organizers/events/event/tickets/allAvailable`
  );
}

export const fetchAvailable = async (eventId) => {
  return await fetchData(
    `/api/Events/organizers/events/event/tickets/available?eventId=${eventId}`
  );
}

export const fetchOrganizers = async() => {
    return await fetchData("/api/EventOrganizer/getAllOrganizers");
}

export const fetchClients = async() => {
    return await fetchData("/api/Client/client/get-all-clients");
}

export const fetchClient = async() => {
    return await fetchData(`/api/Client/client/get-client`);
}
