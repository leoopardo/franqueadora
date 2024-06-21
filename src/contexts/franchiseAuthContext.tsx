import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { congnitoAuthService } from "../franchise/services/auth/CognitoAuthService";
import { RawAxiosRequestHeaders } from "axios";

interface FranchiseAuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
  headers: RawAxiosRequestHeaders;
  setHeader: Dispatch<SetStateAction<RawAxiosRequestHeaders>>;
}

const FranchiseAuthContext = createContext<
  FranchiseAuthContextProps | undefined
>(undefined);

export const FranchiseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | undefined | null>(() => {
    const authToken = congnitoAuthService.getAuthToken();
    return authToken;
  });
  const [headers, setHeader] = useState<RawAxiosRequestHeaders>({
    "ngrok-skip-browser-warning": false,
    Authorization: "",
    AuthToken: "",
    Identity: "",
  });

  return (
    <FranchiseAuthContext.Provider
      value={{ setHeader, setToken, token, headers }}
    >
      {children}
    </FranchiseAuthContext.Provider>
  );
};

export function useFranchiseAuth() {
  const context = useContext(FranchiseAuthContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}
