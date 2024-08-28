import axios from "axios";
import envs from "./envs";

export const apiReports = axios.create({
  baseURL: envs.API.REPORTS,
});
