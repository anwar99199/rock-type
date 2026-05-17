// Updated: Added Google OAuth button alongside email/password auth.
import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Gem, AlertCircle, User } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { initiateAmwalPayment } from '@/app/utils/amwalPay';
import { toast } from 'sonner';

export function AuthModal() {
  const { login, register, loginWithGoogle, isLoading, showAuthModal, setShowAuthModal, authRedirectPlanId, setAuthRedirectPlanId } = useAuth();
  const { language } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!showAuthModal) return null;

  const isAr = language === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const handlePostLogin = async (userId: string, userEmail: string) => {
    setShowAuthModal(false);
    if (authRedirectPlanId) {
      const planId = authRedirectPlanId;
      setAuthRedirectPlanId(null);
      try {
        await initiateAmwalPayment({
          planId,
          userId,
          userEmail,
          language: language as 'en' | 'ar',
          returnUrl: `${window.location.origin}/payment/success?plan=${planId}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
        });
      } catch (err) {
        toast.error(isAr ? 'حدث خطأ أثناء بدء الدفع.' : 'Payment initiation failed.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login(email, password);
        const { supabase } = await import('@/app/contexts/AuthContext');
        const { data: { user: su } } = await supabase.auth.getUser();
        if (su) await handlePostLogin(su.id, su.email ?? email);
      } else {
        if (!name.trim()) throw new Error(isAr ? 'الاسم مطلوب' : 'Name is required');
        if (password.length < 6) throw new Error(isAr ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
        await register(email, password, name);
        toast.success(isAr ? 'تم إنشاء الحساب! تحقق من بريدك الإلكتروني.' : 'Account created! Check your email to confirm.');
        setShowAuthModal(false);
        setAuthRedirectPlanId(null);
      }
    } catch (err: any) {
      const msg = err.message || '';
      if (msg.includes('Invalid login credentials')) {
        setError(isAr ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
      } else if (msg.includes('User already registered')) {
        setError(isAr ? 'هذا البريد الإلكتروني مسجل بالفعل. سجّل الدخول.' : 'Email already registered. Please sign in.');
      } else if (msg.includes('Email not confirmed')) {
        setError(isAr ? 'يرجى تأكيد بريدك الإلكتروني أولاً' : 'Please confirm your email first');
      } else {
        setError(msg || (isAr ? 'حدث خطأ. حاول مرة أخرى.' : 'An error occurred. Please try again.'));
      }
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      // Page redirects to Google — nothing more to do here
    } catch (err: any) {
      setError(err.message || (isAr ? 'فشل تسجيل الدخول بـ Google.' : 'Google sign-in failed.'));
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => { setShowAuthModal(false); setAuthRedirectPlanId(null); }}
      />

      {/* Modal */}
      <div
        dir={dir}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-6 pt-8 pb-10 text-white text-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/30 rounded-full" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-3 backdrop-blur-sm">
              <Gem className="size-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {mode === 'login'
                ? isAr ? 'مرحباً بعودتك' : 'Welcome Back'
                : isAr ? 'إنشاء حساب جديد' : 'Create Account'}
            </h2>
            <p className="text-blue-100 text-sm">
              {authRedirectPlanId
                ? isAr ? 'سجّل الدخول لإتمام الاشتراك' : 'Sign in to complete your subscription'
                : mode === 'login'
                  ? isAr ? 'سجّل دخولك للوصول لحسابك' : 'Sign in to access your account'
                  : isAr ? 'انضم لعالم الأحجار الكريمة' : 'Join the gemstone world'}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => { setShowAuthModal(false); setAuthRedirectPlanId(null); }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Body */}
        <div className="px-6 pt-6 pb-8 -mt-4 relative z-10">

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mb-5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isAr ? 'المتابعة بـ Google' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">
              {isAr ? 'أو بالبريد الإلكتروني' : 'or with email'}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                  <User className="size-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                  required
                  className={`w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 ${isAr ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all`}
                />
              </div>
            )}

            <div className="relative">
              <div className={`absolute inset-y-0 ${isAr ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                <Mail className="size-4 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAr ? 'البريد الإلكتروني' : 'Email address'}
                required
                className={`w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 ${isAr ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all`}
              />
            </div>

            <div className="relative">
              <div className={`absolute inset-y-0 ${isAr ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                <Lock className="size-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isAr ? 'كلمة المرور' : 'Password'}
                required
                className={`w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 ${isAr ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10 text-left'} text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${isAr ? 'left-3' : 'right-3'} flex items-center text-gray-400 hover:text-gray-600`}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {mode === 'register' && (
              <p className="text-xs text-gray-400">
                {isAr ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters'}
              </p>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg px-3 py-2 text-sm">
                <AlertCircle className="size-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl py-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading
                ? isAr ? 'جارٍ...' : 'Please wait...'
                : mode === 'login'
                  ? isAr ? 'تسجيل الدخول' : 'Sign In'
                  : isAr ? 'إنشاء الحساب' : 'Create Account'}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-500 mt-5">
            {mode === 'login'
              ? isAr ? 'ليس لديك حساب؟' : "Don't have an account?"
              : isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
            {' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-blue-600 font-semibold hover:underline"
            >
              {mode === 'login'
                ? isAr ? 'سجّل الآن' : 'Sign up'
                : isAr ? 'سجّل الدخول' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
