import axios from "axios";
import { URI } from "../../config";


//Trae los requisitos no conformes y con oportunidad de mejora del plan de auditoria que tenga esa lista de chequeo
//Id de la lista de chequeo
export const getRequisitesUnfilled =async (id)=> axios.get(URI+`reports/${id}`);
export const createReports = async(data) =>     axios.post(URI+`reports`,data);
export const getAllReports = async() =>          axios.get(URI+`reports/`);
export const getOneReport  = async(id) =>        axios.get(URI+`reports/one/${id}`);
export const validate      = async(id) =>        axios.get(URI+`reports/validate/${id}`);
