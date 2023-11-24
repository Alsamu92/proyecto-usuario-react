import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useUpdateError = (res, setRes, setUser, logout) => {
  //!---------------------------------------> 200
  let contador;
  if (res?.data) {
    contador = 0;
    res?.data?.testUpdate?.map((item) => {
      for (let clave in item) {
        if (item[clave] == false) {
          contador++;
        }
      }
    });
  }

  if (contador == 0) {
    let check = "";

    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == true) {
          check += `-${clave}-`;
        }
      }
    });
    if (res?.status == 200) {
      logout();
      setRes(() => ({}));
      return Swal.fire({
        icon: "success",
        title: `Updated data user✅`,
        text: ` Update: ${check} `,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  //! -------------------------------------> 404 duplicado

  if (res?.response?.data?.message?.includes("duplicate key")  ) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Already in use. Choose another name❎ ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // //! -------------------------------------> 404 general y el 500

  if (res?.response?.status == 500 || res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error! Didn't update user ❎ ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  

  if (contador != 0) {
    if (res?.status == 200) {
      setRes(() => ({}));
      return Swal.fire({
        icon: "error",
        title: `Error updating data ❌`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};
