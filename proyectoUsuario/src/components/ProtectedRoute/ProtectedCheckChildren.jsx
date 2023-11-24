import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedCheckChildren = ({ children }) => {
  //si el estado alluser o el user esta true lo manda al dashboard
  const { allUser, user } = useAuth();
  //separa las dos vias por las que podemos entrar al confirmationcode
  if (allUser?.data?.user?.check == true || user?.check == true) {
    return <Navigate to="/dashboard" />;
  }
  //antes de que se setee estas dos condiciones se tienen que cumplir
  if (user == null && allUser.data.confirmationCode === "") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedCheckChildren;
