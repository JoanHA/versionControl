import axios from "axios";
import { URI } from "../../config";

export const getProcesses     = async  ()     => axios.get(URI+"process")
export const getProcessReq    = async  (id)   => axios.get(URI+`process/${id}`);
export const getOneProcess    = async  (id)   => axios.get(URI+`process/pro/${id}`);
export const getAllReq        = async  ()     => axios.get(URI+`process/req/all`); 
export const getCriteriaTypes = async  ()     => axios.get(URI+`process/req/criteriaType`); 
export const createReq        = async  (data) => axios.post(URI+ "process/createReq",data)
export const createProcess    = async  (data) => axios.post(URI+"process",data)
export const editProcess      = async  (id,data) => axios.put(URI+`process/${id}`,data)

//Manejo de los documentos de consulta

export const createFile    = async (data)=> axios.post(URI+"files",data);
export const getFiles       = async ()=> axios.get(URI+"files");
export const deleteFile     = async (id)=> axios.delete(URI+"files/"+id);
