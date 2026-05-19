import { Link, useSearchParams } from 'react-router';
import { Gem, Sparkles, Zap, Shield, BookOpen, GraduationCap, Video, Crown, Check, LogIn } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { initiateAmwalPayment } from '@/app/utils/amwalPay';

interface Plan {
  id: string;
  name: string;
  nameEn: string;
  price_omr: string;
  price_display: string;
  duration_days: number;
  durationText: string;
  durationTextEn: string;
  popular?: boolean;
  features: string[];
  featuresEn: string[];
}

export function LandingPage() {
  const { t, language, dir } = useLanguage();
  const { user, setShowAuthModal, setAuthRedirectPlanId } = useAuth();
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'OMR' | 'USD'>('OMR');
  const OMR_TO_USD = 2.60;

  const displayPrice = (omrAmount: string): string => {
    if (currency === 'OMR') return `${omrAmount} OMR`;
    const usd = (parseFloat(omrAmount) * OMR_TO_USD).toFixed(2);
    return `$${usd} USD`;
  };
  const plansRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  // Auto-scroll to plans if redirected from AnalyzePage with no subscription
  useEffect(() => {
    if (searchParams.get('scrollTo') === 'plans') {
      setTimeout(() => {
        plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [searchParams]);

  const isAr = language === 'ar';

  const plans: Plan[] = [
    {
      id: 'monthly',
      name: 'شهري',
      nameEn: 'Monthly',
      price_omr: '5.000',
      price_display: '5.000 OMR',
      duration_days: 30,
      durationText: 'شهر واحد',
      durationTextEn: '1 Month',
      features: [
        'تحليل غير محدود للأحجار',
        'الوصول لموسوعة الأحجار الكريمة',
        'دروس التنقيب الكاملة',
        'دروس الفيديو التعليمية',
        'دعم فني على مدار الساعة',
      ],
      featuresEn: [
        'Unlimited stone analysis',
        'Access to gemstone encyclopedia',
        'Complete mining lessons',
        'Educational video courses',
        '24/7 Technical support',
      ],
    },
    {
      id: 'quarterly',
      name: '3 أشهر',
      nameEn: '3 Months',
      price_omr: '9.000',
      price_display: '9.000 OMR',
      duration_days: 90,
      durationText: '3 أشهر',
      durationTextEn: '3 Months',
      features: [
        'تحليل غير محدود للأحجار',
        'الوصول لموسوعة الأحجار الكريمة',
        'دروس التنقيب الكاملة',
        'دروس الفيديو التعليمية',
        'دعم فني على مدار الساعة',
        'توفير 20٪',
      ],
      featuresEn: [
        'Unlimited stone analysis',
        'Access to gemstone encyclopedia',
        'Complete mining lessons',
        'Educational video courses',
        '24/7 Technical support',
        'Save 20%',
      ],
    },
    {
      id: 'yearly',
      name: 'سنوي',
      nameEn: 'Yearly',
      price_omr: '37.000',
      price_display: '37.000 OMR',
      duration_days: 365,
      durationText: '12 شهر',
      durationTextEn: '12 Months',
      popular: true,
      features: [
        'تحليل غير محدود للأحجار',
        'الوصول لموسوعة الأحجار الكريمة',
        'دروس التنقيب الكاملة',
        'دروس الفيديو التعليمية',
        'دعم فني على مدار الساعة',
        'توفير 40٪',
        'أولوية في الدعم الفني',
      ],
      featuresEn: [
        'Unlimited stone analysis',
        'Access to gemstone encyclopedia',
        'Complete mining lessons',
        'Educational video courses',
        '24/7 Technical support',
        'Save 40%',
        'Priority technical support',
      ],
    },
  ];

  const handleHeroSubscribe = () => {
    plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      setAuthRedirectPlanId(planId);
      setShowAuthModal(true);
      return;
    }
    setSubscribing(planId);
    try {
      await initiateAmwalPayment({
        planId,
        userId: user.id,
        userEmail: user.email,
        language: language as 'en' | 'ar',
        returnUrl: `${window.location.origin}/?payment=success&plan=${planId}`,
        cancelUrl: `${window.location.origin}/?payment=cancelled`,
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(
        isAr
          ? 'حدث خطأ أثناء بدء الدفع. حاول مرة أخرى.'
          : 'Payment initiation failed. Please try again.'
      );
    } finally {
      setSubscribing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50" dir={dir}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Gem className="size-10 sm:size-12 md:size-16 text-blue-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                {t('home.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {t('home.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/analyze"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95"
                >
                  {t('home.analyzeBtn')}
                  <Sparkles className="size-4 sm:size-5" />
                </Link>
                <button
                  onClick={handleHeroSubscribe}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95"
                >
                  {isAr ? 'اشترك الآن' : 'Subscribe Now'}
                  <Sparkles className="size-4 sm:size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            {t('home.features')}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Zap className="size-6 sm:size-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('home.feature1.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('home.feature1.description')}</p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Sparkles className="size-6 sm:size-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('home.feature2.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('home.feature2.description')}</p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="size-6 sm:size-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('home.feature3.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('home.feature3.description')}</p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            {t('home.howItWorks')}
          </h2>
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-start gap-3 sm:gap-4 md:gap-6 bg-white rounded-xl p-4 sm:p-6 shadow-md">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {t(('home.step' + step + '.title') as any)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t(('home.step' + step + '.description') as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Encyclopedia Teaser */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-white">
          <div className="text-center">
            <BookOpen className="size-12 sm:size-14 md:size-16 mx-auto mb-4 sm:mb-6 opacity-90" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('home.encyclopediaTeaser.title')}</h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8">{t('home.encyclopediaTeaser.description')}</p>
            <Link to="/stones" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-purple-600 shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95">
              {t('home.encyclopediaTeaser.button')} <BookOpen className="size-4 sm:size-5" />
            </Link>
          </div>
        </div>

        {/* Learning Teaser */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-white">
          <div className="text-center">
            <GraduationCap className="size-12 sm:size-14 md:size-16 mx-auto mb-4 sm:mb-6 opacity-90" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('home.learningTeaser.title')}</h2>
            <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-6 sm:mb-8">{t('home.learningTeaser.description')}</p>
            <Link to="/learn" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-emerald-600 shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95">
              {t('home.learningTeaser.button')} <GraduationCap className="size-4 sm:size-5" />
            </Link>
          </div>
        </div>

        {/* Courses Teaser */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-white">
          <div className="text-center">
            <Video className="size-12 sm:size-14 md:size-16 mx-auto mb-4 sm:mb-6 opacity-90" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('home.coursesTeaser.title')}</h2>
            <p className="text-base sm:text-lg md:text-xl text-orange-100 mb-6 sm:mb-8">{t('home.coursesTeaser.description')}</p>
            <Link to="/courses" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-orange-600 shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95">
              {t('home.coursesTeaser.button')} <Video className="size-4 sm:size-5" />
            </Link>
          </div>
        </div>

        {/* ===== PLANS SECTION ===== */}
        <div ref={plansRef} className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 scroll-mt-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            {t('home.plans')}
          </h2>

          {/* Currency toggle + exchange rate note */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 gap-1">
              <button
                onClick={() => setCurrency('OMR')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  currency === 'OMR'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇴🇲 OMR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇺🇸 USD
              </button>
            </div>
            <p className="text-xs text-gray-400">
              {currency === 'USD'
                ? isAr
                  ? '1 ريال عماني = 2.60 دولار أمريكي • الدفع يتم بالريال العماني'
                  : '1 OMR = 2.60 USD (indicative) • Payment processed in OMR'
                : isAr
                  ? 'الأسعار بالريال العماني'
                  : 'Prices in Omani Rial'}
            </p>
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm text-sm text-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              {isAr ? 'الدفع الآمن عبر AmwalPay' : 'Secure payment via AmwalPay'}
            </div>
          </div>

          {!user && (
            <div className="max-w-md mx-auto mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3 text-sm text-blue-700">
              <LogIn className="size-5 flex-shrink-0" />
              <span>
                {isAr
                  ? 'يجب تسجيل الدخول للاشتراك. انقر على الزر وسيُطلب منك تسجيل الدخول.'
                  : "Sign in required to subscribe. Click Subscribe Now and you'll be prompted to log in."}
              </span>
            </div>
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border hover:shadow-xl transition-shadow relative ${
                  plan.popular ? 'border-2 border-purple-600' : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-purple-600 text-white rounded-full px-4 py-1 text-xs font-bold shadow">
                      {t('home.popular')}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {isAr ? plan.name : plan.nameEn}
                  </h3>
                  {plan.popular && <Crown className="size-5 text-purple-600" />}
                </div>
                <div className="flex items-baseline justify-center mb-4 sm:mb-6 gap-1 flex-wrap">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{displayPrice(plan.price_omr)}</div>
                  <div className="text-sm text-gray-500">/ {isAr ? plan.durationText : plan.durationTextEn}</div>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-6">
                  {(isAr ? plan.features : plan.featuresEn).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 sm:gap-3">
                      <Check className="size-4 sm:size-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={subscribing === plan.id}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 ${
                    plan.popular
                      ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  } ${subscribing === plan.id ? 'opacity-60 cursor-not-allowed !scale-100' : ''}`}
                >
                  {subscribing === plan.id ? (
                    <>
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isAr ? 'جارٍ...' : 'Loading...'}
                    </>
                  ) : !user ? (
                    <>
                      <LogIn className="size-4 sm:size-5" />
                      {isAr ? 'سجّل للاشتراك' : 'Sign in to Subscribe'}
                    </>
                  ) : (
                    <>
                      {isAr ? 'اشترك الآن' : 'Subscribe Now'}
                      <Sparkles className="size-4 sm:size-5" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            {isAr
              ? '🔒 المدفوعات محمية بتشفير HMAC-SHA256 عبر بوابة AmwalPay'
              : '🔒 Payments secured with HMAC-SHA256 encryption via AmwalPay gateway'}
          </p>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">{t('home.cta.title')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">{t('home.cta.description')}</p>
          <Link to="/analyze" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95">
            {t('home.cta.button')} <Sparkles className="size-4 sm:size-5" />
          </Link>
        </div>

        <footer className="mt-12 sm:mt-16 md:mt-20 text-center text-xs sm:text-sm text-gray-500 px-3">
          <p>{t('home.footer')}</p>
        </footer>
      </div>
      <Toaster position="top-center" theme="light" />
    </div>
  );
}
