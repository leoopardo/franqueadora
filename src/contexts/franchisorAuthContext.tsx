import { RawAxiosRequestHeaders } from "axios";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { congnitoAuthService } from "../franchisor/services/auth/CognitoAuthService";

interface FranchisorAuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
  headers: RawAxiosRequestHeaders | null;
  setHeader: Dispatch<SetStateAction<RawAxiosRequestHeaders | null>>;
}

const FranchisorAuthContext = createContext<
  FranchisorAuthContextProps | undefined
>(undefined);

export const FranchisorAuthProvider = ({
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
    <FranchisorAuthContext.Provider
      value={{ setToken, setHeader, token, headers }}
    >
      {children}
    </FranchisorAuthContext.Provider>
  );
};

export function useFranchisorAuth() {
  const context = useContext(FranchisorAuthContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}
