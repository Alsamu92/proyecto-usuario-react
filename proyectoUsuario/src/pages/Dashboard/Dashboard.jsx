import { useEffect, useState } from "react";
import {
  buscarMiUser,
  seguirUser,
  todosLosUser,
} from "../../services/user.service";
import "./Dashboard.css";
import { UserCard } from "../../components";

export const Dashboard = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [miUser, setMiUser] = useState({});
  const [clicked, setClicked] = useState(false);

  const handleSeguirClick = async (id) => {
    setClicked;
    await seguirUser(id);
    setClicked(!clicked);
  };

  useEffect(() => {
    const fetchData = async () => {
      const all = await todosLosUser();
      setDatos(all);
      setLoading(false);
    };
    const user = localStorage.getItem("user");
    if (user) {
      const parseUser = JSON.parse(user);
    
  const traerMiUser=async(parseUser)=>{
  const yo= await buscarMiUser(parseUser)
  const miArray=yo.data[0]?.following
  console.log(miArray)
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
              gender={user.gender}
              comentarios={user.comentarios?.length}
              followed={user.followed?.length}
              following={user.following?.length}
              provincia={user.provincia}
              image={user?.image}
              id={user?._id}
              handleSeguirClick={() => handleSeguirClick(user?._id)}
              additionalClass={miUser.includes(user?._id) ? 'like' : ''}
            />
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
      )}
    </div>
  );}
