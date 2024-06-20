import { useEffect } from "react";
import { useFranchisorAuth } from "../../contexts/franchisorAuthContext";
import { useGetMe } from "../services/auth/useGetMe";
import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";

export const FranchisorRoutes = (): React.ReactElement => {
  const { token } = useFranchisorAuth();
  const { refetch, isSuccess } = useGetMe();

  useEffect(() => {
    refetch();
    console.log(console.log(token));
  }, [token]);

  return token && isSuccess ? <PrivateRoutes /> : <PublicRoutes />;
};
