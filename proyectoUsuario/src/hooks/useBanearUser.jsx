import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { borrarUserDiferente, deleteUserService } from "../services/user.service";
import { Navigate } from "react-router-dom";

export const useBanearUser = (id,setClicked,setDel,clicked,del) => {
  Swal.fire({
    title: "Are you sure you want to delete this profile?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {
    console.log("result", result);

    if (result.isConfirmed) {
      const res = await borrarUserDiferente(id);

      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Delete User",
            text: "See you soon",
            showConfirmButton: false,
            timer: 1500,
          });
          setClicked(!clicked)
          setDel(!del)

          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No deleted User ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });
          setClicked(!clicked)
          setDel(!del)
          break;
      }
    }
  });
};

