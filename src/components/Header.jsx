import React from "react";
import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";

const Header = () => {
  const {buscador, handleModalBuscador, cerrarSesionProyectos} = useProyectos();
  const {cerrarSesionAuth} = useAuth();

  const handleCerrarSesion= ()=>{
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem('token');
  }
  return (
    <header className="px-4 py-5 bg-white border-b text-center">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black p-3">Uptask</h2>


        <div className="md:flex-row md:items-center gap-4 flex-col flex items-center">
        <button type="button" onClick={handleModalBuscador} className="uppercase font-bold mt-3 md:mt-0">Buscar Proyecto</button>
          <Link to="/proyectos" className="font-bold uppercase mx-4">
            Proyectos
          </Link>

          <button className="text-white p-2 bg-sky-600 hover:bg-sky-800 rounded-md uppercase font-bold" onClick={handleCerrarSesion}>
            Cerrar Sesión
          </button>

          <Busqueda/>
        </div>
      </div>
    </header>
  );
};

export default Header;
