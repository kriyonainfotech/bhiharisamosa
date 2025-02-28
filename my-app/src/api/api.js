import axios from "axios";
const baseURL = "https://biharisamosa.in/api";

//api instance
const userInfoApi = axios.create({ baseURL: `${baseURL}"/"` });
export { userInfoApi };
