// Updated: Added Google OAuth via Supabase alongside email/password auth.
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
  provider: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authRedirectPlanId: string | null;
  setAuthRedirectPlanId: (planId: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapSupabaseUser(su: SupabaseUser): User {
  const provider = su.app_metadata?.provider === 'google' ? 'google' : 'email';
  return {
    id: su.id,
    email: su.email ?? '',
    name:
      su.user_metadata?.full_name ||
      su.user_metadata?.name ||
      (su.email ? su.email.split('@')[0] : 'User'),
    avatar: su.user_metadata?.avatar_url || su.user_metadata?.picture,
    provider,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectPlanId, setAuthRedirectPlanId] = useState<string | null>(null);

  useEffect(() => {
    // Restore any pending plan from localStorage (survives Google OAuth redirect)
    const pendingPlan = localStorage.getItem('pending_plan_id');
    if (pendingPlan) setAuthRedirectPlanId(pendingPlan);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(mapSupabaseUser(session.user));
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
        // If user just signed in via Google and had a pending plan, trigger payment
        if (event === 'SIGNED_IN') {
          const planId = localStorage.getItem('pending_plan_id');
          if (planId) {
            localStorage.removeItem('pending_plan_id');
            setAuthRedirectPlanId(null);
            // Small delay to let the UI settle after OAuth redirect
            setTimeout(async () => {
              try {
                const { initiateAmwalPayment } = await import('@/app/utils/amwalPay');
                await initiateAmwalPayment({
                  planId,
                  userId: session.user.id,
                  userEmail: session.user.email ?? '',
                  language: (document.documentElement.lang as 'en' | 'ar') || 'en',
                  returnUrl: `${window.location.origin}/payment/success?plan=${planId}`,
                  cancelUrl: `${window.location.origin}/payment/cancel`,
                });
              } catch (err) {
                console.error('Post-Google-login payment failed:', err);
              }
            }, 1000);
          }
        }
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

  const loginWithGoogle = async () => {
    // Store pending plan before redirect so it survives the OAuth flow
    if (authRedirectPlanId) {
      localStorage.setItem('pending_plan_id', authRedirectPlanId);
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) throw new Error(error.message);
    // Page will redirect to Google — execution stops here
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
