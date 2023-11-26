//! ------------------------------seguir user -----------------------

import { APISuper } from "./super.config";

export const buscarProvinciaSup = async (provincia) => {
    return APISuper.get(`buscarprovincia/${provincia}`, {
   
    })
      .then((res) => res)
      .catch((error) => error);
  };
  