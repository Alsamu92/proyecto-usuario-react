import "./Login.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { loginUserService } from "../../services/user.service";
import { useLoginError } from "../../hooks/useLoginError";


export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  //cuando este logado meter datos del usuario
  const { login, setUser } = useAuth();
  //! ---------- FUNCION QUE GESTIONA LA DATA DEL FORMULARIO-----------------------
  //Es igual que la del register
  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await loginUserService(formData));
    setSend(false);
  };

  //! ---------USEffect ASOCIADO A LA RES PARA GESTIONAR LOS ERRORES----------------
  useEffect(() => {
   //cada vez que cambie la respuesta laza la gestion de errores
    useLoginError(res, setRes, login, setLoginOk);
  }, [res]);
//si llega al login estando logado se setea al estado inicial y lo borra del local
  useEffect(() => {
    setUser(() => null);
    localStorage.removeItem("user");
  }, []);

  //! ---------- LOS CONDICIONALES QUE GESTIONAN LOS ESTADOS DE NAVEGACION--------------
  if (loginOk) {
    //si sale 200 en el login
    if (res.data.user.check == false) {
      //si el token es false lo manda a verificar, si es true al dashboard
      return <Navigate to="/verifyCode" />;
    } else {
      return <Navigate to="/profile" />;
    }
  }
  return (
    <>
      <div className="form-wrap">
        <h1>Sign In</h1>
        <p>We are happy to see you again 💌</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              E-mail
            </label>

            <div className="password_container form-group">
              <input
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register("password", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Password
              </label>
            </div>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              LOGIN
            </button>
          </div>
          <p className="bottom-text">
            <small>
              Have you forgotten the password?
              <Link to="/forgotpassword" className="anchorCustom">
                Change password
              </Link>
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Are you not registered? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </>
  );
};
