import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useForgotPasswordError = (res, setRes, setForgotOk) => {
  //! ----------------------------- 404: 'User no register'
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("Usuario no registrado")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter a valid email address ❎",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //! ----------------------------- 404: 'dont send email and dont update user'

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("No se ha podido enviar el email")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No updated password,  ❎ Try again, please",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //! ----------------------------- 200: {updateUser: true,sendPassword: true}

  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgotOk(() => true);
      setRes(() => ({}));
      Swal.fire({
        icon: "success",
        title: "Change password succesfully",
        text: "We have sent an email with your new password ✅",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  //! ----------------------------- 404: {updateUser: false,sendPassword: true}

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.sendPassword == true &&
    res?.response?.data?.updateUser == false
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "We didn't change your password, your email isn't valid ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------------------- 500: interval server error

  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal server error ❎, please try again ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
