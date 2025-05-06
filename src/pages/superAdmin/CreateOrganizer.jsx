import { useState, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import { AlignLeft } from "lucide-react";
import background from "../../assets/bg-create.webp";
import background2 from "../../assets/wedding.png";
import { ThemeContext } from "../../context/themeContext";
import { Alert } from "@mui/material";
import environment from "../../utils/environment";
import { useNavigate } from "react-router-dom";


const CreateOrganizer = () => {
    const {isDark} = useContext(ThemeContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [organizerToCreate, setOrganizerToCreate] = useState({
        Email: "",
        Password: "",
        Phone: "",
        Name: ""
    });
    const [alert, setAlert] = useState({ message: "", type: "" });
    const [error, setError] = useState("");

    const bgImg = isDark ? background2 : background;


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrganizerToCreate((prev) => ({ ...prev, [name]: value }));
      };
    
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(organizerToCreate.Name === ""){
          setError("Ingrese un nombre");
          return;
        }
        
        if(!validateEmail(organizerToCreate.Email)){
          setError("Email inválido");
          return;
        }

        if(organizerToCreate.Password === ""){
          setError("Ingrese una contraseña");
          return;
        }
      
        if(organizerToCreate.Phone === ""){
          setError("Ingrese un teléfono");
          return;
        }

        if(!Number(organizerToCreate.Phone)){
          setError("Ingrese un teléfono válido");
          return;
        }


      setError("");

          try {
            const url = `${environment.backendUrl}/api/EventOrganizer/CreateEventOrganizer`;
            const method = "POST";
            const response = await fetch(url, {
              method: method,
              headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(organizerToCreate),
            });
            console.log(response);
            if (!response.ok) {
              let errorMessage = "Ha ocurrido un error!";
              try{
                  const errorData = await response.json(); 
                  errorMessage = errorData.message || errorMessage;
              } catch(_) {
                  throw new Error(errorMessage);
              }
              setAlert({ message: "Error al crear organizador.", type: "error" });
              return;
            }
            setAlert({ message: "El organizador se ha creado con éxito!", type: "success" });
            setTimeout(() => {
                navigate("/superadmin");
            }, 2000);
      
          } catch (e) {
            setAlert({ message: e.message, type: "error" });
          }
      };

    return (

      <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${bgImg})`}}>
            {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex p-4">
        {isSidebarOpen && <Sidebar />}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40" onClick={toggleSidebar} />
        )}
        <button onClick={toggleSidebar}>
          <AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500 dark:text-violet-700" />
        </button>

        <h1
        className={
            isSidebarOpen
            ? "text-3xl font-bold text-indigo-500 ml-40 dark:text-violet-700"
            : "text-3xl font-bold text-indigo-500 dark:text-violet-700"
        }
        >
        Crear Organizador
        </h1>
      </div>

    


        <div className="w-3/4 sm:w-3/5 mx-auto mt-14">
          <form
            onSubmit={handleSubmit}
            className={
              isSidebarOpen
                ? `bg-white p-16 w-full space-y-4 mb-10 ml-12 rounded-xl blur-sm dark:text-violet-600 dark:bg-[#1f1f1f]`
                : `bg-white p-16 w-full space-y-4 mb-10 rounded-xl shadow-xl dark:text-violet-600 dark:bg-[#1f1f1f]`
            }
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="Name">Nombre</label>
                <br />

                <input
                  className="focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
                  type="text"
                  name="Name"
                  value={organizerToCreate.Name}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre del Organizador"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="Email">Email</label>
                <br />
                <input
                  className="focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
                  type="email"
                  name="Email"
                  value={organizerToCreate.Email}
                  onChange={handleChange}
                  placeholder="Ingrese el email del Organizador"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="Password">Contraseña</label>
                <br />
                <input
                  className="focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
                  type="password"
                  name="Password"
                  value={organizerToCreate.Password}
                  onChange={handleChange}
                  placeholder="Ingrese la contraseña"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="Phone">Teléfono</label>
                <br />
                <input
                  className="focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] focus:outline-none w-full border-2 border-gray-400 p-2 rounded-lg text-black placeholder:text-gray-500 placeholder-black"
                  type="tel"
                  name="Phone"
                  value={organizerToCreate.Phone}
                  onChange={handleChange}
                  placeholder="Ingrese el teléfono del Organizador"
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <button
                className="px-6 py-2 bg-[#6361f1] hover:scale-105 rounded-lg text-white dark:bg-violet-600" 
                type="submit"
              >
                Crear organizador
              </button>
              {error && (
                <p className="bg-red-700 text-white p-2 rounded-lg">{error}</p>
              )}

              {alert.message && (
                <div
                  className={`alert ${
                    alert.type === "success" ? "bg-green-500" : "bg-red-500"
                  } text-white p-3 rounded-md`}
                >
                  {alert.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
}

export default CreateOrganizer;
