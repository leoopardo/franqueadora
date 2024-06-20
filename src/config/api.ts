import axios from "axios";
import envs from "./envs";

export const apiFranqueadora = axios.create({
  baseURL: envs.API.FRANCHISOR,
});
