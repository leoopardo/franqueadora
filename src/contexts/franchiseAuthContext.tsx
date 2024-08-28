import { RawAxiosRequestHeaders } from "axios";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { congnitoAuthService } from "../_franchise/services/auth/CognitoAuthService";

interface FranchiseAuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
  headers: RawAxiosRequestHeaders | null;
  setHeader: Dispatch<SetStateAction<RawAxiosRequestHeaders | null>>;
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
  const [headers, setHeader] = useState<RawAxiosRequestHeaders | null>(null);

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
