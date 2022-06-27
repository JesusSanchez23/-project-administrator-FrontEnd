import React from 'react'
import useProyectos from '../hooks/useProyectos'
import MostrarProyecto from '../components/MostrarProyecto';
import Alerta from '../components/Alerta';
import io from 'socket.io-client'
import {useEffect} from 'react';

let socket;

const Proyectos = () => {

  const {proyectos,alerta} = useProyectos();

  const {msg} = alerta;

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('prueba', 'jesus');

    socket.on('respuesta', (persona)=>{
      console.log('desdeFrontend',persona);
    })
  })

  return (
    <>
    <h1 className='text-4xl font-black text-center'>Proyectos</h1>

    {msg && <Alerta alerta={alerta}/>}
    <div className='bg-white mt-10 rounded-lg'>
      {
      proyectos.length ? 
      proyectos.map(proyecto => 
        <MostrarProyecto key={proyecto._id} proyecto={proyecto} />
        )
      
      :
      <p className='text-gray-700'>No hay proyectos, comienza a crear uno</p>
      }
    </div>
    </>
  )
}

export default Proyectos