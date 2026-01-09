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

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isPremium: boolean;
  setIsPremium: React.Dispatch<React.SetStateAction<boolean>>;
  refreshAuthState: () => void;
  doLogout: () => void;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  currentUser: ICurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshAuthState = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        credentials: 'include',
        cache: 'no-store',
      });
      if (!res.ok) {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setIsPremium(false);
        return;
      }

      const json = await res.json().catch(() => null);
      const userData = json?.result || null;
      const isAuthenticated = !!userData;

      setCurrentUser(userData);
      setIsLoggedIn(isAuthenticated);

      setIsPremium(
        userData?.activeSubscription?.planCode === PLAN_CODES.STARTER
      );
    } catch {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setIsPremium(false);
    } finally {
      setIsLoading(false);
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
      isLoggedIn,
      setIsLoggedIn,

      isLoading,
      setIsLoading,

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
