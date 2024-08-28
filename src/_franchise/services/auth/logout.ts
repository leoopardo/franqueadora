import axios from "axios";
import { congnitoAuthService } from "./CognitoAuthService";

export const logout = async () => {
    delete axios.defaults.headers.Authorization;
    delete axios.defaults.headers.Identity;
    delete axios.defaults.headers.AuthToken;
    delete axios.defaults.headers["ngrok-skip-browser-warning"];
    congnitoAuthService.signOut();
  };