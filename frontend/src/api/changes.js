import axios from "axios";
import { URI } from "../config";

//Crear un cambio
export const createChange = (data)=>axios.post(URI+"changes",data)