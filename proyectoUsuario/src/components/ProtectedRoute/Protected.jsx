import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
//si intenta acceder a la ruta grapeada por este componente y no cumple la condicion lo redirije al login
export const Protected = ({ children }) => {
  const { user } = useAuth();
  //si no hay usuario o el check es false no entra
  if (user == null || user?.check == false) {
    return <Navigate to="/login" />;
  }

  return children;
};
