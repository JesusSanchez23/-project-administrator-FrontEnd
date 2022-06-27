
import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const params = useParams();
  const {id} = params;

  const [alerta, setAlerta] = useState({});
  const [confirmada, setConfirmada] = useState(false);

  useEffect(()=>{

    const confirmarCuenta = async () => {
   
      try {

        const url = `/usuarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);
        setAlerta({
          msg: data.msg,
          error: false
        })
        setConfirmada(true);

        return;
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
       setConfirmada(false);

       return;

      }

    }

    confirmarCuenta();

  },[])
  return (
    <>
    <h1 className='text-sky-600 capitalize text-5xl font-bold text-center'>Confirma tu cuenta y  comienza a crear tus <span className='text-slate-700'>Proyectos</span></h1>

    {alerta.msg && <Alerta alerta={alerta}  />}

    { confirmada && <Link to='/' className='block text-center my-5 text-slate-600'>Iniciar Sesión</Link>}

</>
  )
}

export default ConfirmarCuenta