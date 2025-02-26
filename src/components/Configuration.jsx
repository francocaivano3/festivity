import { useState } from "react";
import { AlignLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import Alert from "@mui/material/Alert";

const Configuration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

    if (!formData.userName.trim()) {
      newErrors.userName = "Ingrese el nombre de usuario";
    }

    if (!formData.userEmail) {
      newErrors.userEmail = "Ingrese un correo electrónico válido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
    }

    if (formData.password && formData.password.length < 6 || formData.password.length === 0) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Ingrese un número de teléfono válido";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("configuracion enviada");
      setAlert({ message: "Actualizado con éxito", type: "success" });
      setIsSubmitting(false);

      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40" onClick={toggleSidebar} />
      )}
      <div className="flex p-4">
        {isSidebarOpen && <Sidebar />}
        {isSidebarOpen && (
          <button className="z-50 sticky top-0" onClick={toggleSidebar}>
            <AlignLeft className="h-8 w-8 hover:scale-110 transition-all" />
          </button>
        )}
        <button onClick={toggleSidebar}>
          <AlignLeft className="h-8 w-8 hover:scale-110 transition-all duration-200 mr-10 text-indigo-500" />
        </button>

        <h1
          className={
            isSidebarOpen
              ? "text-3xl font-bold text-indigo-500 ml-40"
              : "text-3xl font-bold text-indigo-500"
          }
        >
          Configuración
        </h1>
      </div>

      <div className="bg-gradient-to-r from-[#8A70FF] to-[#4C6FFF] p-6">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
                {alert && <Alert variant="filled" severity={alert.type} sx={{mb: 2}} className="w-1/2 mx-auto">{alert.message}</Alert>}
            
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-[#6366f1] text-xl">Actualizar información</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Usuario</label>
                            <input 
                            type="text" 
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.userName ? "border-red-500" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                            placeholder="Ingrese el nombre de usuario"/>
                            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                        </div>
                        <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                  placeholder="Enter email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                  placeholder="Enter password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-[#8A70FF] focus:border-transparent`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#8A70FF] text-white rounded-lg hover:bg-[#7559FF] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                  "Update Profile"
                )}
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
