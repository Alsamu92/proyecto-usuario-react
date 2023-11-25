import { useEffect, useState } from "react";
import { todosLosUser } from "../../services/user.service";
import "./Dashboard.css";
import { UserCard } from "../../components";

export const Dashboard = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
    
        const all = await todosLosUser();
        setDatos(all);
        setLoading(false);
      
    };
  
    fetchData();
  }, []);
  useEffect(() => {
    // Este efecto se ejecutará cada vez que 'datos' se actualice
    console.log(datos);
  }, [datos]);
  
  return (
    <div>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="contenedor-cartas">
          {datos.data.map((user, index) => (
            <UserCard
              key={index} // Asegúrate de tener una clave única para cada elemento
              name={user.name}
              gender={user.gender}
              comentarios={user.comentarios?.length}
              followed={user.followed?.length}
              following={user.following?.length}
              provincia={user.provincia}
              image={user?.image}
              id={user?._id}
            />
          ))}
        </div>
      )}
    </div>
  );}