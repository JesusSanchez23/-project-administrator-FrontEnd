import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MostrarProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, descripcion, _id, cliente, creador } = proyecto;

  return (
    <div className=" border-b flex p-5 justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre} <span className="text-sm text-gray-500">{cliente}</span>
        </p>

        {auth.id !== creador && <p className="text-white bg-green-500 font-bold uppercase p-1 text-xs rounded-lg ">Colaborador</p>}
      </div>
      <Link
        to={`/proyectos/${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default MostrarProyecto;
