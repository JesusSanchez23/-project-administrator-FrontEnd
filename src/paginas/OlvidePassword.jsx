import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setAlerta({
        msg: 'El campo email es obligatorio',
        error: true
      })

      return;
    }

   try {

    const {data} = await clienteAxios.post(`/usuarios/recuperar`, {email})

    setAlerta({
      msg: data.msg,
      error: false
    })

    setEmail('');

    setTimeout(() => {
      setAlerta({});
    }, 2000);
     
   } catch (error) {
     setAlerta({
        msg: error.response.data.msg,
        error: true
     })
   }

  }
  return (


    <>
      <h1 className="text-sky-600 capitalize text-5xl font-bold text-center">
        Recupera tu Cuenta y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

{alerta.msg && <Alerta alerta={alerta} />}
      <form className="my-5 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email:
          </label>
          <input
            type="email"
            placeholder="Email de registro"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="p-3 bg-sky-600 hover:bg-sky-800 text-white font-bold w-full rounded cursor-pointer transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar" className="block text-center my-5 text-slate-600">
          ¿No tienes Cuenta? Registrate
        </Link>
        <Link to="/" className="block text-center my-5 text-slate-600">
          Iniciar Sesión
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
