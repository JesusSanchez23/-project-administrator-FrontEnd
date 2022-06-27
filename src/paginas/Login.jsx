import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [alerta, setAlerta] = useState({})

const {setAuth, cargando} = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) =>{
  e.preventDefault();
  if([email, password].includes('')){
    setAlerta({msg: 'Todos los campos son obligatorios', error: true})
    return;
  }
  try {
    const url = '/usuarios/login';
    const {data} = await clienteAxios.post(url, {email, password});

    setAlerta({});
    localStorage.setItem('token', data.token);
    setAuth(data);
    navigate('/proyectos');
    
  } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error: true
    })
  }
}

  return (
    <>
    <h1 className='text-sky-600 capitalize text-5xl font-bold text-center'>Inicia Sesión y administra tus <span className='text-slate-700'>Proyectos</span></h1>

{alerta.msg && <Alerta alerta={alerta} />}
    <form className='my-5 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
      <div className='my-5'>
        <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>Email:</label>
        <input type="email" placeholder='Email de registro' id='email' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' value={email} onChange={e =>setEmail(e.target.value)} />
      </div>

      <div className='my-5'>
        <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Password:</label>
        <input type="password" placeholder='Contraseña' id='password' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' value={password} onChange={e =>setPassword(e.target.value)}  />
      </div>

      <input type="submit" value="Iniciar Sesión" className='p-3 bg-sky-600 hover:bg-sky-800 text-white font-bold w-full rounded cursor-pointer transition-colors' />
    </form>

    <nav className='lg:flex lg:justify-between'>
      <Link to='/registrar' className='block text-center my-5 text-slate-600'>¿No tienes Cuenta? Registrate</Link>
      <Link to='/olvide' className='block text-center my-5 text-slate-600'>Olvide mi Password</Link>
    </nav>
    </>
  )
}

export default Login