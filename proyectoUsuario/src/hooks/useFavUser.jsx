import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteUserService, seguirUser } from "../services/user.service";
import { Navigate } from "react-router-dom";

export const useFavUser = (setUser, setFavUser) => {
  Swal.fire({
    title: "Seguro que quieres dar like?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {
    console.log("result", result);

    if (result.isConfirmed) {
      const res = await seguirUser()

      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Usuario Seguido",
            text: "See you soon",
            showConfirmButton: false,
            timer: 1500,
          });

          
          setFavUser(() => true);
          

          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No deleted User ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
