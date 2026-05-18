// Updated: Page is now gated — requires login + active subscription.
// Unauthenticated users → auth modal. No subscription → redirect to plans on home page.
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Gem, Loader, Lock, CreditCard } from 'lucide-react';
import { Toaster } from 'sonner';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSubscription } from '@/app/hooks/useSubscription';
import { StoneAnalyzer } from '@/app/components/StoneAnalyzer';

export function AnalyzePage() {
  const { t, dir } = useLanguage();
  const { user, isLoading: authLoading, setShowAuthModal } = useAuth();
  const subStatus = useSubscription();
  const navigate = useNavigate();
  const isAr = dir === 'rtl';

  useEffect(() => {
    // Wait for auth to finish loading before making decisions
    if (authLoading) return;

    // Not logged in → show auth modal and go back to home
    if (!user) {
      setShowAuthModal(true);
      navigate('/', { replace: true });
      return;
    }

    // Logged in but no active subscription → redirect to plans section on home page
    if (subStatus === 'inactive') {
      navigate('/?scrollTo=plans', { replace: true });
    }
  }, [user, authLoading, subStatus]);

  // Show spinner while auth or subscription is loading
  if (authLoading || subStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <Loader className="size-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            {isAr ? 'جارٍ التحقق من الاشتراك...' : 'Checking subscription...'}
          </p>
        </div>
      </div>
    );
  }

  // Not logged in — show lock screen briefly before redirect kicks in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center" dir={dir}>
        <div className="text-center bg-white rounded-2xl p-10 shadow-xl max-w-sm mx-4">
          <Lock className="size-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isAr ? 'تسجيل الدخول مطلوب' : 'Sign In Required'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isAr ? 'جارٍ تحويلك...' : 'Redirecting you...'}
          </p>
        </div>
      </div>
    );
  }

  // Logged in but no subscription — show message briefly before redirect kicks in
  if (subStatus === 'inactive') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center" dir={dir}>
        <div className="text-center bg-white rounded-2xl p-10 shadow-xl max-w-sm mx-4">
          <CreditCard className="size-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isAr ? 'اشتراك مطلوب' : 'Subscription Required'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isAr ? 'جارٍ تحويلك لخطط الاشتراك...' : 'Redirecting you to subscription plans...'}
          </p>
        </div>
      </div>
    );
  }

  // ✅ Logged in + active subscription → show the analyzer
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir={dir}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <header className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Gem className="size-8 sm:size-10 md:size-12 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {t('analyze.title')}
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-3">
            {t('analyze.subtitle')}
          </p>
        </header>

        <main>
          <StoneAnalyzer />
        </main>

        <footer className="mt-8 sm:mt-12 md:mt-16 text-center text-xs sm:text-sm text-gray-500 px-3">
          <p>{t('analyze.footer')}</p>
        </footer>
      </div>

      <Toaster position="top-center" theme="light" />
    </div>
  );
}
