import React from 'react'
import { useState, useEffect } from 'react'
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

const FormularioProyecto = () => {

    const [nombre, setNombre] = useState('');
    const [id, setId] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const params = useParams();

    const {alerta,mostrarAlerta, submitProyecto, proyecto} = useProyectos();


    useEffect(()=>{
        if(params.id){

            const fechaProyecto = proyecto.fechaEntrega?.split('T')[0];
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(fechaProyecto);
            setCliente(proyecto.cliente);
       
            setId(proyecto._id);
        }
    },[params])    

    const handleSubmit =async e =>{
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error:true
            })

            return;
        }

        await submitProyecto({
            id,
            nombre,
            descripcion,
            fechaEntrega,
            cliente
        })

        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');



    }

  
    

  return (
    <form className='bg-white py-5 px-5 md:w-1/2 rounded-lg' onSubmit={handleSubmit}>
        {alerta.msg && <Alerta alerta={alerta}/>}
        <div className="mb-5">
            <label htmlFor="nombre" className='uppercase font-bold text-gray-700 text-sm'>Nombre Proyecto:</label>
            <input type="text" name="nombre" id="nombre" placeholder='Nombre del proyecto' className='p-2 w-full border rounded mt-2 placeholder-gray-400' value={nombre} onChange={e=> setNombre(e.target.value)} />
            
        </div>

        <div className="mb-5">
            <label htmlFor="descripcion" className='uppercase font-bold text-gray-700 text-sm'>Descripción:</label>
            <textarea name="descripcion" id="descripcion" placeholder='Descripción' className='p-2 w-full border rounded mt-2 placeholder-gray-400' value={descripcion} onChange={e=> setDescripcion(e.target.value)} />
            
        </div>

        <div className="mb-5">
            <label htmlFor="fecha" className='uppercase font-bold text-gray-700 text-sm'>fecha Entrega:</label>
            <input type="date" id="fecha" className='p-2 w-full border rounded mt-2 placeholder-gray-400' value={fechaEntrega} onChange={e=> setFechaEntrega(e.target.value)} />
            
        </div>

        <div className="mb-5">
            <label htmlFor="cliente" className='uppercase font-bold text-gray-700 text-sm'>Cliente:</label>
            <input type="text" name="cliente" id="cliente" placeholder='Cliente' className='p-2 w-full border rounded mt-2 placeholder-gray-400' value={cliente} onChange={e=> setCliente(e.target.value)} />
            
        </div>

        <input type="submit" value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'} className='p-2 bg-sky-600 hover:bg-sky-800 cursor-pointer w-full text-white font-bold rounded-md transition-colors' />
    </form>
    
  )
}

export default FormularioProyecto