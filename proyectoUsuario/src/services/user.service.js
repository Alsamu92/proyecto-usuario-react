import { updateToken } from "../util/updateToken";
import { APIUser } from "./service.config";

//! ------------------------REGISTER------------------------------

export const registerUser = async (formData) => {
  //**Esta es como la llamada en insomnia */
  return APIUser.post(`/register/estado/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//**Este service recibe el body del formulario y completa la llamada a la api cuando se hace el setRes en la funcion formsubmit */

//! ------------------------------- CHECK CODE ---------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  return APIUser.post("/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//!  ------------------------------- RESEND CODE -------------------------------

export const resendCodeConfirmationUser = async (formData) => {
  return APIUser.post("/resendcode/", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -------------------------------- AUTOLOGIN ----------------------------------

export const autologinUser = async (formData) => {
  return APIUser.post("/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -------------------------------- LOGIN -------------------------------------

export const loginUserService = async (formData) => {
  return APIUser.post("/login", formData)
    .then((res) => res)
    .catch((error) => error);
};



//! ------------------------------------ CAMBIO CONTRASEÑA SIN TOKEN-------------

export const forgotPasswordUser = async (formData) => {
  return APIUser.patch("/cambiarpass/cambiarpass/", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------------------BORRADO DEL USUARIO----------------------

export const deleteUserService = async () => {
  return APIUser.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
//! ---------------------------- CAMBIO CONTRASEÑA CUANDO ESTAS LOGADO----
export const changePasswordUserToken = async (formData) => {
  return APIUser.patch("/cambiarlogeado/", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
//! ------------------------------ UPDATE USER -----------------------

export const updateUser = async (formData) => {
  return APIUser.patch("/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
//! ------------------------------ Get all USERs -----------------------

export const todosLosUser = async (formData) => {
  return APIUser.get("/", formData, {
    headers: {
     
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
 
//! ------------------------------seguir user -----------------------

export const seguirUser = async (userseguido) => {
  return APIUser.patch(`/seguiruser/${userseguido}/`, {
    headers: {
      
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
 