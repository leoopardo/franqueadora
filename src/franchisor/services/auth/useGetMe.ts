import { useQuery } from "react-query";
import { api } from "../../../config/api";
import { congnitoAuthService } from "./CognitoAuthService";
import axios from "axios";

export function useGetMe() {
  async function setHeader() {
    const user = await congnitoAuthService.getToken();
    const authToken = congnitoAuthService.getAuthToken();
    const token = user.accessToken.jwtToken;
    const idToken = user.idToken.jwtToken;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    axios.defaults.headers.Identity = `${idToken}`;
    axios.defaults.headers.AuthToken = `${authToken}`;
    axios.defaults.headers["ngrok-skip-browser-warning"] = true;
  }
  setHeader();
  const { data, error, isLoading, refetch, isSuccess } = useQuery<
    any | null | undefined
  >(
    ["getMe"],
    async () => {
      const response = await api("franqueadora").get("/user/me");
      return response.data;
    },
    { enabled: false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
    isSuccess,
  };
}
