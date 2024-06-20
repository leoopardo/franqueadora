import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { congnitoAuthService } from "../franchise/services/auth/CognitoAuthService";

interface FranchiseAuthContextProps {
  setToken: Dispatch<SetStateAction<string | undefined | null>>;
  token?: string | null;
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
    return authToken
  });

  return (
    <FranchiseAuthContext.Provider value={{ token, setToken }}>
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
