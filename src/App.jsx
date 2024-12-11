import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OrganizerDashboard from "./pages/eventOrganizer/OrganizerDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventForm from "./pages/eventOrganizer/EventForm";
const App = () => {
  const router = createBrowserRouter([
    {element: <Login/>, path: "/login", },
    {element: <Dashboard/>, path: "/"},
    {element: <OrganizerDashboard/>, path: "/organizer"},
    {element: <EventForm/>, path: "/create-event"}
  ])

  return (
      <div>
        <RouterProvider router={router} />
      </div>
  )
}

export default App;