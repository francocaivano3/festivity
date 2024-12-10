import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {element: <Login/>, path: "/login", },
    {element: <Dashboard/>, path: "/"}
  ])

  return (
      <div>
        <RouterProvider router={router} />
      </div>
  )
}

export default App;