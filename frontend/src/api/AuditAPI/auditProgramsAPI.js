import axios from "axios";
import { URI } from "../../config";
export const createProgram = async (data)=>axios.post(URI+"programs",data);
export const getProgram = async ()=>axios.get(URI+"programs");
export const getOneProgram = async (id)=>axios.get(URI+`programs/${id}`);
export const addProgramField = async (data)=>axios.post(URI+"programs/add",data)