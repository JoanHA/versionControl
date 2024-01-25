import axios from "axios";
import { URI } from "../config";


export const Login = (data)=>axios.post(URI+"auth/login",data)
export const verifyToken = (data)=>axios.post(URI+"auxiliars/verifyToken",data);