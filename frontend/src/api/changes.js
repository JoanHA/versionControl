import axios from "axios";
import { URI } from "../config";

//Crear un cambio
export const createChange = (data)=>axios.post(URI+"changes",data);

//Traer todos los cambios de un documento
export const getChangesFromOne = (id)=>axios.get(URI+`changes/${id}`);

//Traer todos los cambios
export const getChanges = ()=> axios.get(URI+"changes")


//Retención de documentos 

//Traer los datos de donde se archiva
export const getInformation = (code)=>axios.get(URI+`changes/archived/${code}`);

//Traer todos los datos 
export const getArchived = ()=>axios.get(URI+"changes/archived")