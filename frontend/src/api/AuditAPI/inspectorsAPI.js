import axios from "axios"
import {URI} from "../../config"

export const createInspectors = async(data)=> axios.post(URI+"inspectors",data);
export const getAllInspectors = async ()=>axios.get(URI+"inspectors");
export const getOneInspector  = async (id)=>axios.get(URI+`inspectors/${id}`);
export const updateInspector  = async (id,data)=>axios.put(URI+`inspectors/${id}`,data);
export const deleteInspectors = async (id)=>axios.delete(URI+`inspectors/${id}`);
export const getInpectorRoles = async ()=>axios.get(URI+"inspectors/roles");


