import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'email';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authRedirectPlanId: string | null;
  setAuthRedirectPlanId: (planId: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectPlanId, setAuthRedirectPlanId] = useState<string | null>(null);

  // Persist user in sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('rock_type_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - in production, connect to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (!email || !password) throw new Error('Email and password required');
      
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        provider: 'email',
      };
      
      setUser(mockUser);
      sessionStorage.setItem('rock_type_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth - replace with real Google OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      const mockUser: User = {
        id: `google-${Date.now()}`,
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: 'https://lh3.googleusercontent.com/a/default-user',
        provider: 'google',
      };
      
      setUser(mockUser);
      sessionStorage.setItem('rock_type_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('rock_type_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        logout,
        showAuthModal,
        setShowAuthModal,
        authRedirectPlanId,
        setAuthRedirectPlanId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
