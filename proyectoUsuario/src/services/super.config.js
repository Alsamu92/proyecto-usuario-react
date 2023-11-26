import axios from "axios";
import { updateToken } from "../util/updateToken";


const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${updateToken()}`,
};

export const APISuper = axios.create({
  baseURL: `http://localhost:8080/api/v1/supermercados`,
  headers: APIHeaders,
  timeout: 600000,
});
//**Este service configura los header y 
//* crea la llamada con axios para que el otro service lo tenga disponible */