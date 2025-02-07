import environment from "./environment";

export const fetchEvents = async (setEvents) => {
    try {
        const response = await fetch(`${environment.backendUrl}/api/Events/organizer/events`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        });

        if(!response.ok){
            throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
    } catch (e) {
        console.error("Error while fetching events: ", e);
    };
}

export const soldTickets = async (eventId) => {
    try {
        const response = await fetch(`${environment.backendUrl}/api/Events/organizers/events/event/tickets/sold?eventId=${eventId}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        });

        if(!response.ok){
            throw new Error("Failed to fetch sold tickets");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error("Error while fetching sold tickets: ", e);
        return 0;
    }
}

