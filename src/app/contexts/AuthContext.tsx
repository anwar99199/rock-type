// Updated: Replaced mock auth with real Supabase Auth (email/password).
// Users are created in Supabase Auth, profiles saved to profiles table.
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ozkjmexjcjcizihypjri.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96a2ptZXhqY2pjaXppaHlwanJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTI3MjQsImV4cCI6MjA4NDQ2ODcyNH0.2emZbLeeGe4LncggzO72B1cGrN9ugb5Er84dxxpL_Zk';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'email';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authRedirectPlanId: string | null;
  setAuthRedirectPlanId: (planId: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapSupabaseUser(su: SupabaseUser): User {
  return {
    id: su.id,
    email: su.email ?? '',
    name:
      su.user_metadata?.name ||
      su.user_metadata?.full_name ||
      (su.email ? su.email.split('@')[0] : 'User'),
    provider: 'email',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectPlanId, setAuthRedirectPlanId] = useState<string | null>(null);

  // On mount, restore session from Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(mapSupabaseUser(session.user));
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      if (data.user) setUser(mapSupabaseUser(data.user));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) throw new Error(error.message);
      if (data.user) setUser(mapSupabaseUser(data.user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
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
