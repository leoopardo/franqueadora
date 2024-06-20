import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { congnitoAuthService } from "../franchisor/services/auth/CognitoAuthService";

interface FranchisorAuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
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
    return authToken
  });

  useEffect(() => {
    setToken(congnitoAuthService.getAuthToken() || undefined)
  }, [token]);

  return (
    <FranchisorAuthContext.Provider value={{ token, setToken }}>
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
