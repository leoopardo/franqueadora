import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { congnitoAuthService } from "./CognitoAuthService";

export function useGetMe() {
  async function setHeader() {
    const user = await congnitoAuthService.getToken();
    const authToken = congnitoAuthService.getAuthToken();
    const token = user.accessToken.jwtToken;
    const idToken = user.idToken.jwtToken;
    apiFranquia.defaults.headers.Authorization = `Bearer ${token}`;
    apiFranquia.defaults.headers.Identity = `${idToken}`;
    apiFranquia.defaults.headers.AuthToken = `${authToken}`;
    apiFranquia.defaults.headers["ngrok-skip-browser-warning"] = true;
  }
  setHeader();
  const { data, error, isLoading, refetch, isSuccess } = useQuery<
    any | null | undefined
  >(
    ["getMe"],
    async () => {
      const response = await apiFranquia.get("/user/me");
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
