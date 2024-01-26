import axios from "axios";
import { URI } from "../config";

export const getUsers = () => axios.get(URI + "users");
export const registerUser = () => axios.post(URI + "auth/register");
export const updateUser = (data) => axios.put(URI + "users", data);
