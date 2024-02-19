import axios from "axios";
import { URI } from "../config";
//Obtener un solo control
export const getOneControl = (id) =>axios.get(URI+`controls/${id}`);

//Editar control 
export const editControl = (id,data)=>axios.put(URI+`controls/${id}`,data)