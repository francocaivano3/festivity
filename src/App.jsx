import AlertProvider from "./context/alertContext";
import Alert from "./components/Alert";
import Private from "./components/Private";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OrganizerDashboard from "./pages/eventOrganizer/OrganizerDashboard";
import ClientDashboard from "./pages/cliente/ClientDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventForm from "./pages/eventOrganizer/EventForm";
import OrganizerEvents from "./pages/eventOrganizer/OrganizerEvents";
import Error from "./components/Error";
import MyTickets from "./pages/cliente/MyTickets";
import { AuthContextProvider } from "./context/authContext";
import Register from "./components/Register";
const App = () => {
  const router = createBrowserRouter([
    {element: <Login/>, path: "/login", },
    {element: <Register/>, path: "/register"},
    {element: <Dashboard/>, path: "/"},
    {element:
      <Private requiredRole={"EventOrganizer"}>
        <OrganizerDashboard/>
      </Private>,
     path: "/organizer"},
    {element: 
    <Private requiredRole={"EventOrganizer"}>
      <EventForm/>
    </Private>, 
    path: "/create-event"},
    {element: 
    <Private requiredRole={"EventOrganizer"}>
      <OrganizerEvents/>,
    </Private>
    , path: "/my-events"},
    {element: <Error errorNum={404}/>, path: "*"},
    {element: 
      <Private requiredRole={"Client"}>
        <ClientDashboard/>
      </Private>
    , path: "/client"},
    {element: 
      <Private requiredRole={"Client"}>
        <MyTickets/>
      </Private>
    , path: "/my-tickets"},
    {
      element: <Error errorNum={403}/>,
      path: "/error403"
    }
  ])

  return (
    <AuthContextProvider>
      <AlertProvider>
        <Alert />
        <RouterProvider router={router} />
      </AlertProvider>
    </AuthContextProvider>
  )
}

export default App;