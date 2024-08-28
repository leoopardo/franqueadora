import { RawAxiosRequestHeaders } from "axios";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { congnitoAuthService } from "../_franchisor/services/auth/CognitoAuthService";

interface ReportsAuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
  headers: RawAxiosRequestHeaders | null;
  setHeader: Dispatch<SetStateAction<RawAxiosRequestHeaders | null>>;
}

const ReportsAuthContext = createContext<
  ReportsAuthContextProps | undefined
>(undefined);

export const ReportsAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | undefined | null>(() => {
    const authToken = congnitoAuthService.getAuthToken();
    return authToken;
  });
  const [headers, setHeader] = useState<RawAxiosRequestHeaders | null>({
    "ngrok-skip-browser-warning": false,
    Authorization: "",
    AuthToken: "",
    Identity: "",
  });

  return (
    <ReportsAuthContext.Provider
      value={{ setToken, setHeader, token, headers }}
    >
      {children}
    </ReportsAuthContext.Provider>
  );
};

export function useReportsAuth() {
  const context = useContext(ReportsAuthContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}
