import axios from "axios";
import { URI } from "../../config";

export const createAuditPlan = async (data) => axios.post(URI + "plans/", data);
export const getAuditPlan = async () => axios.get(URI + "plans/");
export const getOneAuditPlan = async (id) => axios.get(URI + `plans/${id}`);
