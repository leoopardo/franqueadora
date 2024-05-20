import axios from "axios";
import envs from "./envs";

export const api = (
  portal?:
    | "franqueadora"
    | "portal-franquia"
    | "terminal-event"
    | "portal-event"
    | "auth"
) => {
  switch (portal) {
    case "portal-franquia":
      return axios.create({
        baseURL: envs.API.FRANCHISEE,
      });
    case "terminal-event":
      return axios.create({
        baseURL: envs.API.TERMINAL_EVENT,
      });
    case "portal-event":
      return axios.create({
        baseURL: envs.API.PORTAL_EVENT,
      });
    case "auth":
      return axios.create({
        baseURL: envs.COGNITO.AUTH_URL,
      });
    default:
    case "franqueadora":
      return axios.create({
        baseURL: envs.API.FRANCHISOR,
      });
  }
};
