/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { QueryCache, QueryClient } from "react-query";
import { congnitoAuthService } from "../franchisor/services/auth/CognitoAuthService";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (err: any) => {
      console.log("err", err);

      if (err?.response?.status === 401 || err?.response?.status === 403) {
        if (
          err?.response?.data?.message ===
          "Desculpe, sua conta foi temporariamente bloqueada devido a quatro tentativas incorretas consecutivas de inserção do token de autenticação. Por favor, entre em contato com o usuário master para desbloquear sua conta."
        ) {
          notification.error({
            message: "Usuário bloqueado!",
            description: err?.response?.data?.message,
          });
        } else {
          notification.error({
            message: "Token expirado!",
            description: "Por favor, faça login novamente.",
          });
        }
        await congnitoAuthService.signOut();
      }
    },
  }),
  defaultOptions: { queries: { retry: false, keepPreviousData: true } },
});
