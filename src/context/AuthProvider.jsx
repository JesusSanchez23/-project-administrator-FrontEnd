import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return};

      // consfiguración, cuando le envias el bearer Token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        }
      }
      try {
        const {data} = await clienteAxios(`/usuarios/perfil`, config);
        setAuth(data);
        // navigate("/proyectos");

      } catch (error) {
        setAuth({});
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = ()=>{
    setAuth({});
  }

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default AuthContext;
