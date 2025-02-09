import AlertProvider from "./context/alertContext";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OrganizerDashboard from "./pages/eventOrganizer/OrganizerDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventForm from "./pages/eventOrganizer/EventForm";
import OrganizerEvents from "./pages/eventOrganizer/OrganizerEvents";
import Error from "./components/Error";
const App = () => {
  const router = createBrowserRouter([
    {element: <Login/>, path: "/login", },
    {element: <Dashboard/>, path: "/"},
    {element: <OrganizerDashboard/>, path: "/organizer"},
    {element: <EventForm/>, path: "/create-event"},
    {element: <OrganizerEvents/>, path: "/my-events"},
    {element: <Error/>, path: "*", }
  ])

  return (
      <AlertProvider>
        <Alert />
        <RouterProvider router={router} />
      </AlertProvider>
  )
}

export default App;