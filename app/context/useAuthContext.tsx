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
import { PLAN_CODES } from '../constants/plan';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextProps {
  authStatus: AuthStatus;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isPremium: boolean;
  setIsPremium: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const refreshAuthState = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        credentials: 'include',
        cache: 'no-store',
      });

      const json = await res.json();
      const userData = json?.result || null;
      const isAuthenticated = userData ? true : false;
      setCurrentUser(userData);
      setIsLoggedIn(isAuthenticated);
      setAuthStatus(isAuthenticated ? 'authenticated' : 'unauthenticated');

      if (userData?.activeSubscription?.planCode === PLAN_CODES.STARTER) {
        setIsPremium(true);
      }
    } catch {
      setCurrentUser(null);
      setAuthStatus('unauthenticated');
      setIsLoggedIn(false);
      setIsPremium(false);
    }
  }, []);

  const doLogout = useCallback(async () => {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    await res.json();
    clearLocalStorage();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsPremium(false);
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

      isPremium,
      setIsPremium,

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
