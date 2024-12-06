import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {element: <Login/>, path: "/"}
  ])

  return (
      <div>
        <RouterProvider router={router} />
      </div>
  )
}

export default App;