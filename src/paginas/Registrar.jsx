import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, password2].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (password !== password2) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    // crear el usuario en la API
    try {
      const {data} = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      setAlerta({ msg: data.msg, error: false });

      setNombre("");
      setEmail("");
      setPassword("");
      setPassword2("");

    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 capitalize text-5xl font-bold text-center">
        Registrate y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {alerta.msg && <Alerta alerta={alerta} />}
      <form
        className="my-5 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre:
          </label>
          <input
            type="text"
            placeholder="Nombre"
            id="nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password:
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir Password:
          </label>
          <input
            type="password"
            placeholder="Repite tu Contraseña"
            id="password2"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="p-3 bg-sky-600 hover:bg-sky-800 text-white font-bold w-full rounded cursor-pointer transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-600">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link to="/olvide" className="block text-center my-5 text-slate-600">
          Olvide mi Password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
