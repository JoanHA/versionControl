import axios from "axios";
import { URI } from "../config";

export const getUsers = () => axios.get(URI + "users");
export const registerUser = () => axios.post(URI + "auth/register");
export const updateUser = (data) => axios.put(URI + "users", data);
export const getUser = (id) => axios.get(URI + `users/${id}`);
export const passwordChanger = (data)=>axios.put(URI+"users/changePassword",data);
export const deleteUsers = (id)=>axios.delete(URI+`users/${id}`);
