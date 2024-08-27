import { apiFranqueadora } from "../../../config/api";
import { congnitoAuthService } from "./CognitoAuthService";

export const logout = async () => {
    delete apiFranqueadora.defaults.headers.Authorization;
    delete apiFranqueadora.defaults.headers.Identity;
    delete apiFranqueadora.defaults.headers.AuthToken;
    delete apiFranqueadora.defaults.headers["ngrok-skip-browser-warning"];
    congnitoAuthService.signOut();
  };