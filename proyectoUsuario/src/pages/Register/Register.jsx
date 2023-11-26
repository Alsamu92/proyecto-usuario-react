
import "./Register.css";


import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { registerUser } from "../../services/user.service";
import { FormProvincias, Uploadfile } from "../../components";
import { useEffect, useState } from "react";
import { useErrorRegister } from "../../hooks/useErrorRegister";


export const Register = () => {
  // allUser es la respuesta completa del 200 del service de registro
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setRegisterOk] = useState(false);


  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    if (inputFile.length != 0) {
      // si es diferente a cero quiere decir que tenemos una imagen
      const customFormData = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    } else {
      // en este caso no hay imagen y nos quedamos con lo que tenemos en el form data
      const customFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    }
  };


  useEffect(() => {
    
    useErrorRegister(res, setRegisterOk, setRes);
    //si es un 200 llama a la funcion puente
    if (res?.status == 200) bridgeData("ALLUSER");
  }, [res]);
//este useEffect nos da un console para ver que esta pasando.Lo dejo comentado para futuras pruebas
  useEffect(() => {
    console.log("😍", allUser);
  }, [allUser]);

  if (okRegister) {
    //si todo esta ok navega a la pagina del codigo
    return <Navigate to="/verifyCode" />;
  }
  return (
    <div className="todo-form">
      <div className="form-wrap">
        <h1>Sign Up</h1>
        <p>It’s free and only takes a minute.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Username
            </label>
          </div>
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

            <div className="sexo">
              <input
                type="radio"
                name="sexo"
                id="hombre"
                value="hombre"
                {...register("gender")}
              />
              
              <label htmlFor="hombre" className="label-radio hombre">
                Hombre
              </label>
              <input
                type="radio"
                name="sexo"
                id="mujer"
                value="mujer"
                {...register("gender")}
              />
              <label htmlFor="mujer" className="label-radio mujer">
                Mujer
              </label>
            </div>
            <FormProvincias registerForm={register("provincia", { required: 'Seleccione una provincia' })} />

            <Uploadfile />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              Register
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{" "}
              <Link className="anchorCustom">Terms & Conditions</Link> and{" "}
              <Link className="anchorCustom">Privacy Policy</Link>.
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};
