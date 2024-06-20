import axios from "axios";
import envs from "./envs";

export const apiFranquia = axios.create({
  baseURL: envs.API.FRANCHISEE,
});
