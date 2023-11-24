import { useEffect, useState } from "react";
import { todosLosUser } from "../../services/user.service";
import "./Dashboard.css";

export const Dashboard = () => {
  const [datos, setDatos] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await todosLosUser();
        // console.log(all);
        setDatos(all);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [datos]); // The empty dependency array ensures that this effect runs only once on component mount

  return (
    <div>
      <h2>{datos?.data[1].name}</h2>
   <ul>
         
        </ul>
    
      
    </div>
  );
};