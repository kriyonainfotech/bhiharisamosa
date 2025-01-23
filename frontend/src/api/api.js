import axios from "axios";
// const baseURL="http://localhost:5000/api"
const baseURL = "https://biharisamosa.in/api";

//api instance
const userInfoApi = axios.create({ baseURL: `${baseURL}"/"` });
export { userInfoApi };
