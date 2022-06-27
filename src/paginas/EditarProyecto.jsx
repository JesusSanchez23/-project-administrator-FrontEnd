import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import FormularioProyecto from "../components/FormularioProyecto";

const EditarProyecto = () => {
  const params = useParams();
  const { id } = params;
  const { obtenerProyecto, proyecto, cargando,eliminarProyecto } = useProyectos();

  const { nombre, descripcion, cliente } = proyecto;

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const handleEliminar = async () => {
      const confirmar = confirm('¿Estas seguro de eliminar el proyecto?') 

      if(confirmar){
            await eliminarProyecto(id)
      }
            
      
  }

  if (cargando) return "Cargando...";

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <button className="uppercase font-bold" onClick={handleEliminar}>Eliminar</button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </div>
  );
};

export default EditarProyecto;
