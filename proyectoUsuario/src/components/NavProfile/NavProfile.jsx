import { Link } from "react-router-dom";
import "./NavProfile.css";
useAuth
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useAuth } from "../../context/authContext";

export const NavProfile = () => {
  const { setUser, setDeleteUser } = useAuth();
  return (
    <div className="containerNavProfile">
      <Link to="/profile/changePassword">
      <span className="material-symbols-outlined">
lock_reset
</span>
      </Link>

      <Link to="/profile/">
        <span className="material-symbols-outlined">
        face
        </span>
      </Link>

      <span   onClick={() => useDeleteUser(setUser, setDeleteUser)}className="material-symbols-outlined">
delete
</span>
      
      
    </div>
  );
};
