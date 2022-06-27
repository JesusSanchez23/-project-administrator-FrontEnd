import useProyectos from "../hooks/useProyectos";


const Colaborador = ({colaborador}) => {
  const {handleModalEliminarColaborador, modalEliminarColaborador} = useProyectos();
const {nombre, email} = colaborador;
  return (
    <>
    
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-700">{nombre}</p>
        <p>{email}</p>
      </div>
      <div>
    <button className="bg-red-600 p-2 font-bold text-sm rounded-lg text-white hover:bg-red-800" onClick={()=>handleModalEliminarColaborador(colaborador)}>Eliminar</button>
      </div>
    </div>

    
    </>
    
  )
}

export default Colaborador