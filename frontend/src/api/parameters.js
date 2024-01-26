import  axios from "axios"
import { URI } from "../config"


export const newParam = (data) =>axios.post(URI+"parameters",data)
export const LastModified = ()=>axios.get(URI+"parameters/last")
export const MostModified = ()=>axios.get(URI+"parameters/most")
