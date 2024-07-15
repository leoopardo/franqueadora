import axios from "axios";
import envs from "./envs";

export const apiPortalEvent = axios.create({
  baseURL: envs.API.PORTAL_EVENT,
});
