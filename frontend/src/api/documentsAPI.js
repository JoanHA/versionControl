import axios from "axios"
import { URI } from "../config"

//Obtener todos los documentos
export const getAllDocuments = ()=> axios.get(URI + "documents/")

export const getOneDocument = (id)=>axios.get(URI+ `documents/${id}`)
//Crear documento 
export const createDocument = (data) =>axios.post(URI+"documents/",data)

//Obtener las Letras de codigo e iniciales de proceso
export const getAuxiliars = ()=>axios.get(URI+"auxiliars")

//obtener los procesos y las tipologias
export const getProcessTypologies = ()=>axios.get(URI+"auxiliars/pyt")

//Obtener la disposicion final
export const getLastMove = ()=>axios.get(URI+ "auxiliars/lastMove")