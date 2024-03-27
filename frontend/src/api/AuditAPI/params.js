import axios from "axios";
import { URI } from "../../config";

export const getAudiTypes = async () => axios.get(URI + "auditsParams/auditTypes");
