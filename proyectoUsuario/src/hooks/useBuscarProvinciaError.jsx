import Swal from "sweetalert2"
import React from 'react'

export const useBuscarProvinciaError = (resp,setResp) => {
    if (resp?.status == 200) {
    
          ;
       
           Swal.fire({
             icon: "success",
             title: "Supermercados Encontrados",
             showConfirmButton: false,
             timer: 1500,
           });
          ;}
    if (resp?.response?.status == 404) {
    
          ;
       
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No hay supermercados❎!",
            showConfirmButton: false,
            timer: 1500,
           });
          ;}
}

