import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearLocalStorage,
  getAccessTokenFromCookie,
} from "../helpers/local-storage";

interface AuthContextProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  refreshAuthState: () => void;
  doLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const refreshAuthState = useCallback(() => {
    setIsLoggedIn(Boolean(getAccessTokenFromCookie()));
  }, []);

  const doLogout = useCallback(() => {
    clearLocalStorage();
    refreshAuthState();
  }, [refreshAuthState]);

  useEffect(() => {
    setIsLoggedIn(Boolean(getAccessTokenFromCookie()));
  }, []);

  const values = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
      isLoggedIn,
      setIsLoggedIn,

      refreshAuthState,
      doLogout,
    }),
    [
      isModalOpen,
      setIsModalOpen,
      isLoggedIn,
      setIsLoggedIn,
      refreshAuthState,
      doLogout,
    ]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
