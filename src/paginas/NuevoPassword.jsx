import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);

  const params = useParams();

  const { token } = params;



  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true
      })
    }
    setAlerta({});

try {
  const url = `/usuarios/recuperar/${token}`;

  const {data} = await clienteAxios.post(url, {token, password});
  setAlerta({
    msg: data.msg,
    error: false
  })

 setPassword("");
} catch (error) {
  setAlerta({
    msg: "El token es inválido o ha expirado",
    error: true
  })
}

  };

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/usuarios/recuperar/${token}`;

        const {data} = await clienteAxios(url);

        setTokenValido(true);
      } catch (error) {
        console.log(error.response);
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 capitalize text-5xl font-bold text-center">
        Recupera tu Password y accede a tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}

{tokenValido &&

<>
 <form
 className="my-5 bg-white shadow rounded-lg p-10"
 onSubmit={handleSubmit}
>
 <div className="my-5">
   <label
     htmlFor="password"
     className="uppercase text-gray-600 block text-xl font-bold"
   >
     Nuevo Password:
   </label>
   <input
     type="password"
     placeholder="Nueva Contraseña"
     id="password"
     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
   />
 </div>

 <input
   type="submit"
   value="Actualizar Password"
   className="p-3 bg-sky-600 hover:bg-sky-800 text-white font-bold w-full rounded cursor-pointer transition-colors"
 />
</form>

<nav className="lg:flex lg:justify-center">
<Link to="/" className="block text-center my-5 text-slate-600">
  Iniciar Sesión
</Link>

</nav>

</>

}
     
    </>
  );
};

export default NuevoPassword;
