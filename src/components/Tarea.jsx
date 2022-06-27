import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { nombre, descripcion, fechaEntrega, estado, prioridad, _id } = tarea;

  const {handleModalEditarTarea, handleModalEliminarTarea,completarTarea} = useProyectos();
  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">{prioridad}</p>

        {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
      </div>
      <div className="flex flex-col gap-2 md:flex-row">

        {admin && (
        <button onClick={()=>handleModalEditarTarea(tarea)} className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg hover:bg-indigo-800">
          Editar
        </button>
        )}

      
          <button className={`${estado ?  'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold rounded-lg hover:bg-sky-800`} onClick={()=>completarTarea(_id)}>
            {estado ? 'Completa' : 'Incompleta'}
          </button>
       

{admin && (
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg hover:bg-red-800" onClick={()=>handleModalEliminarTarea(tarea)}>
          Eliminar
        </button>
)}
      </div>
    </div>
  );
};

export default Tarea;
