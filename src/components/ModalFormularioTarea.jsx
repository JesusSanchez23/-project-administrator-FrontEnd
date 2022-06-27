import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";
import { formatearFecha } from "../helpers/formatearFecha";

const PRIORIDAD = ['Alta', 'Media', 'Baja'];

const ModalFormularioTarea = () => {
  const { handleModalTarea, modalFormularioTarea,alerta,mostrarAlerta, submitTarea,tarea } = useProyectos();

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState('')

  const params = useParams();


  useEffect(() => {



    if(tarea?._id){
      setId(tarea._id);
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setPrioridad(tarea.prioridad);
      setFechaEntrega(tarea.fechaEntrega.split('T')[0]);
      return;
    }

    setId('');
    setNombre("");
    setDescripcion("");
    setPrioridad("");
    setFechaEntrega("");
 


  },[tarea])


  const handleSubmit = async e =>{
    e.preventDefault();

    if([nombre, descripcion, prioridad, fechaEntrega].includes("")){
        mostrarAlerta({
            msg: "Todos los campos son obligatorios",
            error: true
        })

        return;
        
    }
    await submitTarea({
        id,
        nombre,
        descripcion,
        prioridad,
        fechaEntrega,
        proyecto:params.id
    })

    setId('');
    setNombre("");
    setDescripcion("");
    setPrioridad("");
    setFechaEntrega("");
 


}

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTarea}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTarea}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Crear Tarea
                  </Dialog.Title>
                  {alerta.msg && <Alerta alerta={alerta} />}

                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="my-5">
                      <label
                        className="text-right text-gray-700 uppercase  font-bold"
                        htmlFor="nombre"
                      >
                        Nombre Tarea:
                      </label>
                      <input
                        className="w-full border-2 p-2 m-2 placeholder-gray-400 rounded-md"
                        type="text"
                        id="nombre"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="my-5">
                      <label
                        className="text-right text-gray-700 uppercase  font-bold"
                        htmlFor="descripcion"
                      >
                        Descripcion Tarea:
                      </label>
                      <textarea
                        className="w-full border-2 p-2 m-2 placeholder-gray-400 rounded-md"
                        id="descripcion"
                        placeholder="Descripcion Tarea"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

               

                    <div className="my-5">
                      <label
                        className="text-right text-gray-700 uppercase  font-bold"
                        htmlFor="fecha-entrega">
                       Fecha Entrega:
                      </label>
                      <input
                      type="date"
                        className="w-full border-2 p-2 m-2 placeholder-gray-400 rounded-md"
                        id="fecha-entrega"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                      />
                    </div>

                    <div className="my-5">
                      <label
                        className="text-right text-gray-700 uppercase  font-bold"
                        htmlFor="descripcion"
                      >
                        Prioridad Tarea:
                      </label>

                      <select
                        className="w-full border-2 p-2 m-2 placeholder-gray-400 rounded-md"
                        id="prioridad"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="">--Seleccione--</option>

                        {PRIORIDAD.map((prioridad) => (
                            <option key={prioridad} value={prioridad}>{prioridad}</option>
                        ))}

                      </select>
                    </div>

                    <input type="submit" value={id ? 'Editar Tarea' : 'Crear Tarea'} className="bg-sky-600 hover:bg-sky-700 uppercase text-white font-bold p-2 w-full rounded transition-colors" />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
