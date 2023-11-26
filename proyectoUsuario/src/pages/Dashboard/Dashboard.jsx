import { useEffect, useState } from "react";
import {
  borrarUserDiferente,
  buscarMiUser,
  seguirUser,
  todosLosUser,
} from "../../services/user.service";
import "./Dashboard.css";
import { UserCard } from "../../components";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useBanearUser } from "../../hooks/useBanearUser";

export const Dashboard = () => {
  const [datos, setDatos] = useState([]);
  const [funcion, setFuncion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [miUser, setMiUser] = useState({});
  const [clicked, setClicked] = useState(false);
  const [del, setDel] = useState(false);
//funcion que gestiona los click en los corazones
  const handleSeguirClick = async (id) => {
    setClicked;
    //lanza el controlador toggle con el id recibido por el onCLick del corazon
    await seguirUser(id);
    setClicked(!clicked);
  };
 
//lanza 
  useEffect(() => {
    const fetchData = async () => {
      const all = await todosLosUser();
      setDatos(all);
      setLoading(false);
    };
    const user = localStorage.getItem("user");
    if (user) {
      const parseUser = JSON.parse(user);
    //busca el usuario que esta dando like sacando el nombre del localStorage
  const traerMiUser=async(parseUser)=>{
    //esto lo necesito para dar la clase adicional en el caso de que miUSer siga a este
  const yo= await buscarMiUser(parseUser)
  const miArray=yo.data[0]?.following
  console.log(miUser)
  //este otro estado guarda el rol del que esta usando la pagina
  setFuncion(yo?.data[0].rol)
  setMiUser(miArray)
  }
  traerMiUser(parseUser?.user)
    }

    fetchData();
  }, [clicked]);

  return (
    <div>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="contenedor-cartas">
        {datos ? (
          datos?.data?.map((user, index) => (
            <UserCard
              key={index}
              name={user.name}
              gender={ user.gender}
              comentarios={user.comentarios?.length}
              followed={user.followed?.length}
              following={user.following?.length}
              provincia={user.provincia}
              image={user?.image}
              id={user?._id}
              rol={funcion}
              handleBorrar={() => useBanearUser(user._id,setClicked,setDel,clicked,del)}
              handleSeguirClick={() => handleSeguirClick(user?._id)}
              additionalClass={miUser?.includes(user?._id) ? 'like' : ''}
            />
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
      )}
    </div>
  );}
