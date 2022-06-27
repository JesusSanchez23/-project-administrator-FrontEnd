import { useState } from "react";

import Alerta from "./Alerta";
import useProyectos from "../hooks/useProyectos";
const FormularioColaborador = () => {

    const [email, setEmail] = useState('')

    const {mostrarAlerta,alerta,submitColaborador} = useProyectos();

    const handleSubmit = async e =>{
        e.preventDefault()
        if(email === ''){
            mostrarAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }

     await submitColaborador(email);
        setEmail('');
    }

    const {msg} = alerta;
  return (
      <>
    <form className="bg-white py-10 px-5 shadow rounded w-full md:w-1/2" onSubmit={handleSubmit}>
    {msg && <Alerta alerta={alerta} /> }     
        <div className="mb-5">
            <label htmlFor="email" className='uppercase font-bold text-gray-700 text-sm'>Email Colaborador:</label>
            <input type="email" name="email" id="email" placeholder='Email del colaborador' className='p-2 w-full border rounded mt-2 placeholder-gray-400' value={email} onChange={e=> setEmail(e.target.value)} />
            
        </div>
        <input type="submit" value='Buscar Colaborador' className='p-2 bg-sky-600 hover:bg-sky-800 cursor-pointer w-full text-white font-bold rounded-md transition-colors' />
    
    </form>
      </>
  )
}

export default FormularioColaborador