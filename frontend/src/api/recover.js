import axios from "axios";
import { URI } from "../config";


export const recoveryPassword =(data)=> axios.post(URI+"auxiliars/send_recovery_email",data);
export const changePasswordEmail = async (data) => axios.put(`${URI}auxiliars/changePassword/email`,data)