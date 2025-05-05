import { useEffect, useState } from "react";
import { AlignLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import Alert from "@mui/material/Alert";
import environment from "../utils/environment";
import { fetchClient } from "../utils/fetch";
import ConfirmDialog from "../components/ConfirmDialog";
import Auth from "../services/auth";

const Configuration = ({role}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [confirmPassword, setIsConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const token = localStorage.getItem("authToken");
  const [confirm, setConfirm] = useState(false);
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const loadUserData = async() => {
    try {
      const response = await fetchClient();
      setUserData(response);
      setFormData({
        name: response.name || "",
        email: response.email || "",
        phone: response.phone || "",
        password: ""
      })
    } catch (error) {
      setAlert({message: error.message, type: 'error'});
    }}
    loadUserData();
  }, []);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleConfirmPassword = (e) => {
    setIsConfirmPassword(e.target.value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = `Ingrese el nombre del ${role}`;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
    }

    if (
      (formData.password && formData.password.length < 6) ||
      formData.password.length === 0
    ) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Ingrese un número de teléfono válido";
    }
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
      return;
    } 
    
    setIsSubmitting(true);

    try {
      const url = `${environment.backendUrl}/api/Client/client/update`;
      const method = "PUT";
      const response = await fetch(url, {
          method: method,
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      });
      console.log(formData);
      if(!response.ok){
          const errorData = await response.json(); 
          setAlert({ message: `Error: ${errorData.message || 'Ha ocurrido un error!'}`, type: "error" });
          throw new Error("Failed to update event");
      }

      setAlert({ message: "El usuario ha sido actualizado!", type: "success" });
      setTimeout(() => {
          window.location.reload();
      }, 2000);
  } catch(e) {
    console.error(e);
      setAlert({ message: "Error al actualizar el usuario!", type: "error" });
  }

    setIsSubmitting(false);
  };

  const handleDelete = () => {
    setConfirm(true);
  }

  const handleDeletion = async() => {
    
    try {
      const url = `${environment.backendUrl}/api/Client/client/delete`;
      const method = "DELETE";
      const response = await fetch(url, {
          method: method,
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json"
          }
      });
      if(!response.ok){
          const errorData = await response.json(); 
          setAlert({ message: `Error: ${errorData.message || 'Error al eliminar el usuario!'}`, type: "error" });
          throw new Error("Failed to delete user");
      }
      setAlert({ message: "El usuario ha sido eliminado!", type: "success" });
      setTimeout(() => {
        setAlert({ message: "", type:""});
        Auth.logout();
        Auth.checkAndRemoveExpiredToken();
      }, 2000);
    } catch (e) {
      console.error(e);
      setAlert({ message: "Error al eliminar el usuario!", type: "error" });
    }
  }


  return (
    <div className="min-h-screen dark:bg-[#111]">
      {confirm && (
        <ConfirmDialog
          open={confirm}
          message="¿Estás seguro de que quieres eliminar tu cuenta?"
          onConfirm={handleDeletion}
          onClose={() => setConfirm(false)}
        />
      )}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40" onClick={toggleSidebar} />
      )}
      <div className="flex p-4">
        {isSidebarOpen && <Sidebar />}
        {isSidebarOpen && (
          <button className="z-50 sticky top-0" onClick={toggleSidebar}>
            <AlignLeft className="h-8 w-8 hover:scale-110 transition-all dark:text-white" />
          </button>
        )}
        <button onClick={toggleSidebar}>
          <AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500" />
        </button>

        <h1
          className={
            isSidebarOpen
              ? "text-3xl font-bold text-indigo-500 ml-40 dark:text-violet-600"
              : "text-3xl font-bold text-indigo-500 dark:text-violet-600"
          }
        >
          Configuración
        </h1>
      </div>

      <div className={isSidebarOpen ? "p-6 blur-sm" : "p-6"}>
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-white rounded-xl shadow-lg p-6 dark:bg-[#1f1f1f]"
            id="form-config"
          >
            {alert && (
              <Alert
                variant="filled"
                severity={alert.type}
                sx={{ mb: 2 }}
                className="w-1/2 mx-auto"
              >
                {alert.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-[#6366f1] dark:text-violet-500 text-xl">
                Actualizar información
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-violet-500 mb-2">
                    Nombre del {role}
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    defaultValue={formData.name}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                    placeholder="Ingrese el nombre de usuario"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-violet-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                    placeholder="Ingrese el email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-violet-500 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    defaultValue={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                    placeholder="Ingrese la contraseña"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-violet-500 mb-2">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                    placeholder="Confirme la contraseña"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-violet-500 mb-2">
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                    placeholder="Ingrese el número de teléfono"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#6366f1] dark:bg-violet-600 dark:hover:bg-violet-800 text-white rounded-lg hover:bg-[#7559FF] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Updating...</span>
                    </>
                  ) : (
                    "Actualizar"
                  )}
                </button>

                <button
                  type="button"
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Borrar cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
