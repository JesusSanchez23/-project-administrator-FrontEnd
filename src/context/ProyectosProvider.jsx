import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import Proyectos from "../paginas/Proyectos";
import io from 'socket.io-client'
import Tarea from "../components/Tarea";
import useAuth from "../hooks/useAuth"

let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);
  const [buscador, setBuscador] = useState(false);
  // const [colaborador, setColaborador] = useState({});

  const navigate = useNavigate();
  const {auth} = useAuth();

  useEffect(() => {
    const consultarProyectos = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (!token) return;

      try {
        const { data } = await clienteAxios("/proyectos", config);

        setProyectos(data);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    consultarProyectos();
  }, [auth]);

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL);




  },[])

 

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };
  // funcion para editar proyecto
  const editarProyecto = async (proyecto) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) return;

    try {
      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      // sincronizar state
      const proyectosActualizados = proyectos.map((proyectoActual) =>
        proyectoActual._id === data.id ? data : proyectoActual
      );

      setProyectos(proyectosActualizados);

      setAlerta({
        msg: "Proyecto actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 2000);

      // mostrar alerta
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoProyecto = async (proyecto) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) return;

    try {
      const { data } = await clienteAxios.post("/proyectos", proyecto, config);

      setProyectos([...proyectos, data]);

      setAlerta({
        msg: "Proyecto creado con éxito",
        error: false,
      });

      setTimeout(() => {
        navigate("/proyectos");
        setAlerta({});
      }, 1500);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  //funcion que obtine los proyectos por separada, delcomponente /paginas/Proyecto.jsx
  const obtenerProyecto = async (id) => {
    setCargando(true);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) return;

    try {
      const { data } = await clienteAxios.get(`/proyectos/${id}`, config);

      setProyecto(data);
    } catch (error) {
      navigate("/proyectos");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 1500);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProyecto = async (id) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) return;

    try {
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

      const proyectoEliminado = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );

      console.log(proyectoEliminado);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        navigate("/proyectos");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const crearTarea = async (tarea) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clienteAxios.post("/tareas", tarea, config);

      // //  agrega la tarea al state
      // const proyectoActualizado = { ...proyecto };
      // proyectoActualizado.tareas = [...proyecto.tareas, data];
      // setProyecto(proyectoActualizado);

      setAlerta({});
      setModalFormularioTarea(false);

      //socket io

      socket.emit('nueva tarea', data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      
      
      // const proyectoActualizado = { ...proyecto };
      // proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        //   (tareaActual) => (tareaActual._id === data._id ? data : tareaActual)
  // );
  
  // setProyecto(proyectoActualizado);
  setAlerta({});
  setModalFormularioTarea(false);


  // parte de socket que reemplaza al codigo comentado
  socket.emit("actualizar tarea", data);


    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
      // const proyectoActualizado = { ...proyecto };
      // proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      //   (tareaState) => tareaState._id !== tarea._id
      // );
      // setProyecto(proyectoActualizado);
      setModalEliminarTarea(false);
      setTarea({});


      // socket que reemplaza lo comentado arriba
      socket.emit("eliminar tarea", tarea);

      setTimeout(() => {
        setAlerta({});
      }, 2000);



    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/proyectos/colaboradores",
        { email },
        config
      );

      setColaborador(data);
      setAlerta({
        msg: "Usuario Encontrado",
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    // console.log(proyecto);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setColaborador({});
      setTimeout(() => {
        navigate(`/proyectos/${proyecto._id}`);
        setAlerta({});
      }, 1500);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 1500);
    }
  };

  const handleModalEliminarColaborador = async (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );

      setProyecto(proyectoActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setColaborador({});
      setModalEliminarColaborador(false);
      setTimeout(() => {
        setAlerta({});
      }, 1500);
    } catch (error) {
      console.log(error.response);
    }
  };

  const completarTarea = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );

      // const proyectoActualizado = { ...proyecto };
      // proyectoActualizado.tareas = proyectoActualizado.tareas.map(
      //   (tareaState) => (tareaState._id === data._id ? data : tareaState)
      // );
      // setProyecto(proyectoActualizado);
//completar tarea en tiempo real con socket
      socket.emit('completar tarea', data)

      setTarea({});
      setAlerta({});
    } catch (error) {
      console.log(error.response);
    }
    2;
  };

  const handleModalBuscador = ()=>{
    setBuscador(!buscador);
  }


  // socket io
const submitTareasProyecto = (tarea)=>{
   //  agrega la tarea al state
   const proyectoActualizado = { ...proyecto };
   proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
   setProyecto(proyectoActualizado);
}

const eliminarTareaProyecto = tarea =>{
   const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
        (tareaState) => tareaState._id !== tarea._id
      );
      setProyecto(proyectoActualizado);
}

const actualizarTareaProyecto = tarea =>{
  // console.log(tarea);
  const proyectoActualizado = { ...proyecto };
  proyectoActualizado.tareas = proyectoActualizado.tareas.map(
    (tareaActual) => (tareaActual._id === tarea._id ? tarea : tareaActual)
  );

  setProyecto(proyectoActualizado);
}

const completarTareaProyecto = tarea =>{
  const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === tarea._id ? tarea : tareaState)
      );
      setProyecto(proyectoActualizado);
}

const cerrarSesionProyectos = ()=>{
  setProyecto({});
  setAlerta({});
  setProyectos([]);

}

  return (
    <ProyectosContext.Provider
      value={{
        mostrarAlerta,
        proyectos,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        handleModalTarea,
        modalFormularioTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleModalBuscador,
        buscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        completarTareaProyecto,
        cerrarSesionProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
