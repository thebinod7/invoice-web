import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { API_BASE_URL } from '../helpers/config';
import { clearLocalStorage } from '../helpers/local-storage';
import { ICurrentUser } from '../types';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextProps {
  authStatus: AuthStatus;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  refreshAuthState: () => void;
  doLogout: () => void;

  currentUser: ICurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  const refreshAuthState = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        credentials: 'include',
        cache: 'no-store',
      });

      const json = await res.json();
      const isAuthenticated = json.result ? true : false;
      setCurrentUser(json.result);
      setIsLoggedIn(isAuthenticated);
      setAuthStatus(isAuthenticated ? 'authenticated' : 'unauthenticated');
    } catch {
      setAuthStatus('unauthenticated');
      setIsLoggedIn(false);
    }
  }, []);

  const doLogout = useCallback(async () => {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    const json = await res.json();
    clearLocalStorage();
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.location.href = '/';
  }, []);

  useEffect(() => {
    refreshAuthState();
  }, []);

  const values = useMemo(
    () => ({
      authStatus,
      isLoggedIn,
      setIsLoggedIn,

      currentUser,
      setCurrentUser,

      refreshAuthState,
      doLogout,
    }),
    [
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      setCurrentUser,
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
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};
