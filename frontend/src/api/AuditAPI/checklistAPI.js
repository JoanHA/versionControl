import axios from "axios";
import { URI } from "../../config";

export const createChecklist = async (data) => axios.post(URI + "checklist", data);
export const getCheckLists = async () => axios.get(URI + "checklist");
export const getOneList = async (id) => axios.get(URI + `checklist/${id}`);
export const editChecklist = async (id,data) => axios.put(URI + `checklist/${id}`,data);

