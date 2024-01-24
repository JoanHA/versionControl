import  axios from "axios"
import { URI } from "../config"


export const newParam = (data) =>axios.post(URI+"parameters",data)