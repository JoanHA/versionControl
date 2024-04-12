import axios from "axios";
import { URI } from "../../config";

export const getOneFinalReport = async (id) =>axios.get(`${URI}final_report/${id}`);
export const getFinalReports = async () => axios.get(`${URI}final_report/`);
export const CreateFinalReport = async (data) => axios.post(`${URI}final_report/`, data);
