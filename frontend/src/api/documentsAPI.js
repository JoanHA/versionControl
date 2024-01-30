import axios from "axios"
import { URI } from "../config"

//Obtener todos los documentos
export const getAllDocuments = ()=> axios.get(URI + "documents/")
//obtener datos de un document
export const getOneDocument = (id)=>axios.get(URI+ `documents/${id}`)
//Crear documento 
export const createDocument = (data) =>axios.post(URI+"documents/doc",data)

//Actualizar documento 
export const updateDocument = (data)=>axios.put(URI+"documents",data)

//Obtener las Letras de codigo e iniciales de proceso
export const getAuxiliars = ()=>axios.get(URI+"auxiliars")

//obtener los procesos y las tipologias
export const getProcessTypologies = ()=>axios.get(URI+"auxiliars/pyt")

//Obtener la disposicion final
export const getLastMove = ()=>axios.get(URI+ "auxiliars/lastMove")


//Crear el control de archivo
export const createControl = (data) =>axios.post(URI +"documents/control",data)

//Masive saved
export const saveMasive = (data)=>axios.post(URI + "auxiliars/masive",data)