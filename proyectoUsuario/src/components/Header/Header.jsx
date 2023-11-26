import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/authContext";
import logo from "../../assets/logo.png";
import nombre from "../../assets/nombre.png";
import { useState } from "react";
export const Header = () => {
  const [mostrarBarra,setMostrarbarra]=useState(false)
  const handleMostrarBarra=()=>{
    setMostrarbarra(!mostrarBarra)
  }
  const { user, logout } = useAuth();
  return (
    <>
    { (!mostrarBarra && user == null)&&
    <div className="mensaje-registro">
    <div className="mensajeyboton"> 
    <div></div>
      <NavLink to="/register" onClick={handleMostrarBarra}>Register here  </NavLink>
      <button className='cierre'  onClick={handleMostrarBarra}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
      </div>
    <p>"Join VecinoMarket and enjoy exclusive offers."</p>
    </div>}
   
      <header className="main-header">
        <div className="search-bar">
          <NavLink to="/">
            <img src={logo} className="imagen-vecino"></img>
          </NavLink>
          <img src={nombre} className="nombre-vecino"></img>
          <div id="iniciarayuda">
            <div className="contacto">
              <span className="material-symbols-outlined">contact_support</span>
              Support
            </div>
            {user == null && (
              <NavLink to="/login" className="logate">
                <span className="material-symbols-outlined">passkey</span>
                Log In
              </NavLink>
            )}
            {user !== null ? (
              <>
              <div>
              <span onClick={() => logout()} className="material-symbols-outlined logout">logout</span>
            Logout
              </div>
             
                <NavLink className="profileCircle" to ="/profile">
                  <img
                    //cambia a la imagen del user
                    className="profileCircle"
                    src={user.image}
                    alt={user.user}
                  />
                  Profile
                </NavLink>
              </>
            ) : null}
          </div>
        </div>
        <div className="nav-links">
          <NavLink to="/supermercados">Supermarkets</NavLink>
          <a href="/">Black Friday 2023</a>
          <a href="/">Special Offers</a>
          {user !== null && (
            <div className="especiales">
              {" "}
              <NavLink to="/dashboard">
              Club VecinoMarket
              </NavLink>
              <a href="/">Community</a>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
