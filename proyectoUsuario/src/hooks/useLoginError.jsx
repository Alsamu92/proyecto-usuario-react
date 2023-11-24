import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useLoginError = (res, setRes, userLogin, setLoginOk) => {
  //! -----------------200

  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
      _id: res.data.user._id,
    };
// como ahora estamos logados hacemos el custom data para quedarnos lo que nos interesa
//lo convierto en un string y llamo a la funcion del contexto,que lo mete en el estado.
    const stringUser = JSON.stringify(dataCustom);
    userLogin(stringUser);
    setLoginOk(() => true);

    Swal.fire({
      icon: "success",
      title: "Welcome to my Page",
      text: "Login ok ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 404: 'User no registered'

  if (res?.response?.data?.includes("usuario no registrado")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Unregistered user ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //!------------------ 404: 'password dont match'

  if (res?.response?.data?.includes("La contraseña no coincide")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password doesn't  match ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 500
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
