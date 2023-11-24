import "./CheckCode.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/authContext";


import { useCheckCodeError } from "../../hooks/useCheckCodeError";
import { checkCodeConfirmationUser, resendCodeConfirmationUser } from "../../services/user.service";
import { useAutoLogin } from "../../hooks/useAutoLogin";
import { useResendCodeError } from "../../hooks/useResendCodeError";


export const CheckCode = () => {
  const navigate = useNavigate();
  const { allUser, login, setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  // EL RES Va a ser para el check cdel code
  const [res, setRes] = useState({});
  // resResend va a ser para gestionar el renvio del codigo de confirmacion
  const [resResend, setResResend] = useState({});
  const [send, setSend] = useState(false);
  const [okCheck, setOkCheck] = useState(false);

  // ------> estos dos estados se utilizan para cuando se recarga la pagin por el usuario
  const [okDeleteUser, setOkDeleteUser] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  //! -------FUNCION QUE GESTIONA LA DATA DEL FORMULARIO-------
  const formSubmit = async (formData) => {
    const userLocal = localStorage.getItem("user");

    if (userLocal == null) {
      ///  si no esta en el local es que entramos por el register
      const custFormData = {
      //lo cogemos del formadata y lo convertimos a numero
        confirmationCode: parseInt(formData.confirmationCode),
        //allUser es una respuesta
        email: allUser.data.user.email,
      };
      //el send se usa para deshabilitar los botones
      setSend(true);
      setRes(await checkCodeConfirmationUser(custFormData));
      setSend(false);
    } else {
      // si existe es que estamos entrando por el login
      //hace lo mismo que lo de arriba pero coge la info de otro sitio
      const parseUser = JSON.parse(userLocal);
      const customFormData = {
        email: parseUser.email,
        confirmationCode: parseInt(formData.confirmationCode),
      };
      setSend(true);
      setRes(await checkCodeConfirmationUser(customFormData));
      setSend(false);
    }
  };

  const handleReSend = async () => {
    const userLocal = localStorage.getItem("user");
    if (userLocal != null) {
      const parseUser = JSON.parse(userLocal);
      const customFormData = {
        email: parseUser.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    } else {
      const customFormData = {
        email: allUser?.data?.user?.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    }
  };

  //! --------USE EFFECT QUE NOS SIRVE CUANDO CAMBIA RES A LANZAR EL COMPROBADOR DE ERRORES
  useEffect(() => {
    console.log("😭", res);
    useCheckCodeError(
      res,
      setRes,
      setOkCheck,
      setOkDeleteUser,
      login,
      setUserNotFound
    );
  }, [res]);

  useEffect(() => {
    console.log("😃", resResend);
    useResendCodeError(resResend, setResResend, setUserNotFound);
  }, [resResend]);


  //! -------- PONEMOS LOS CONDICIONALES QUE EVALUAN SI ESTAN A TRUE LOS ESTADOS DE NAVEGACION (deleUser, okCheck)
  if (okCheck) {
    console.log("primer if")
    /// aqwui vamos a hacer  el autologin para cuando viene del register
    // para cuando viene del login lo gestionamos en el usecheckCodeError ---> modificamos el localstorage y el user del contexto
    if (!localStorage.getItem("user")) {
     //solo voy a hacer esto cuando el user venga del registro
     //si hay algo en el local es que viene del login
      useAutoLogin(allUser, login);
    } else {
     //si ya hay algo en el local mandalo al dashboard
      return <Navigate to="/dashboard" />;
    }
  }
  return (
    <>
      <div className="form-wrap">
        <h1>Verify your code 👌</h1>
        <p>Write the code sent to your email</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("confirmationCode", { required: false })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Registration code
            </label>
          </div>

          <div className="btn_container">
            <button
              id="btnCheck"
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Verify Code
            </button>
          </div>
          <div className="btn_container">
            <button
              id="btnResend"
              className="btn"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              onClick={() => handleReSend()}
            >
              Resend Code
            </button>
          </div>

          <p className="bottom-text">
            <small>
              If the code is not correct ❌, your user will be deleted from the
              database and you will need to register again.{" "}
            </small>
          </p>
        </form>
      </div>
    </>
  );
};
