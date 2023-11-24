import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useChangePasswordError = (res, setRes, setUser) => {
  
  //!----------------- 200: updateUser: true,
  if (res?.data?.updateUSer?.toString() == "true") {
    setUser(() => null);
    localStorage.removeItem("user");
    setRes(() => ({}));
    return Swal.fire({
      icon: "success",
      title: "Password changed successfully ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //!------------------200: updateUser: false,
  if (res?.data?.updateUSer?.toString() == "false") {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //! -----------------404: 'password dont match'
  if (res?.response?.data?.includes("La contraseña no coincide")) {
    console.log("password ❌");
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Old password doesn't match ❎. Try again, please",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //! -----------------404: 'password dont match'
  if (res?.response?.data?.includes("La contraseña no es segura")) {
    console.log("password ❌");
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: " Password isn't secure,  ❎ Try again, please",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! -----------------404: general
  if (res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! -----------------500: interval server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
