// PaymentSuccessModal: shown on the homepage when AmwalPay redirects back
// with ?payment=success. Saves subscription to Supabase and shows thank-you.
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { CheckCircle, X, Sparkles } from 'lucide-react';
import { useAuth, supabase } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PLAN_DURATION_DAYS, PLAN_PRICES } from '@/app/utils/amwalPay';

export function PaymentSuccessModal() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [planId, setPlanId] = useState('monthly');
  const [saved, setSaved] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    const paymentParam = searchParams.get('payment');
    const responseCode = searchParams.get('responseCode') || searchParams.get('ResponseCode');
    const planParam = searchParams.get('plan') || 'monthly';

    const isSuccess = paymentParam === 'success' || responseCode === '00';
    if (!isSuccess) return;

    setPlanId(planParam);
    setShow(true);

    // Save subscription to Supabase
    if (user && !saved) {
      setSaved(true);
      saveSubscription(user.id, planParam);
    }

    // Clean up URL so refreshing doesn't retrigger
    navigate('/', { replace: true });
  }, [searchParams, user]);

  const saveSubscription = async (userId: string, plan: string) => {
    try {
      const pending = localStorage.getItem('pending_payment');
      const pendingData = pending ? JSON.parse(pending) : {};
      localStorage.removeItem('pending_payment');

      const durationDays = PLAN_DURATION_DAYS[plan] ?? 30;
      const now = new Date();
      const endAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

      // Deactivate any existing subscriptions for this user
      await supabase
        .from('subscriptions')
        .update({ status: 'inactive' })
        .eq('user_id', userId)
        .eq('status', 'active');

      // Insert new active subscription
      const { error: subError } = await supabase.from('subscriptions').insert({
        user_id: userId,
        plan_id: plan,
        status: 'active',
        start_at: now.toISOString(),
        end_at: endAt.toISOString(),
      });

      if (subError) console.error('Subscription save error:', subError);

      // Save payment record
      const txnId = searchParams.get('transactionId') || searchParams.get('TransactionId');
      const amount = PLAN_PRICES[plan]?.amount || '0';

      await supabase.from('payments').insert({
        user_id: userId,
        plan_id: plan,
        amount,
        currency: 'OMR',
        transaction_id: txnId || null,
        merchant_reference: pendingData.merchantReference || null,
        response_code: searchParams.get('responseCode') || '00',
        status: 'completed',
      });

      console.log('✅ Subscription and payment saved to Supabase');
    } catch (err) {
      console.error('Failed to save subscription:', err);
    }
  };

  if (!show) return null;

  const planLabel = isAr
    ? PLAN_PRICES[planId]?.labelAr
    : PLAN_PRICES[planId]?.label;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: 'successIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Green header */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 pt-10 pb-12 text-white text-center relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-400/30 rounded-full" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <CheckCircle className="size-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {isAr ? 'تمّ الدفع بنجاح! 🎉' : 'Payment Successful! 🎉'}
            </h2>
            <p className="text-green-100 text-sm">
              {isAr ? 'شكراً لاشتراكك في GeoSton' : 'Thank you for subscribing to GeoSton'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Body */}
        <div className="px-6 py-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-800 font-semibold text-sm mb-1">
              {isAr ? 'الخطة المفعّلة:' : 'Active Plan:'}
            </p>
            <p className="text-green-700 text-lg font-bold">{planLabel}</p>
            <p className="text-green-600 text-xs mt-1">
              {isAr ? 'اشتراكك مفعّل الآن ويمكنك البدء فوراً' : 'Your subscription is now active'}
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {isAr
              ? 'يمكنك الآن الوصول إلى جميع ميزات المنصة بما فيها تحليل الأحجار الكريمة والموسوعة الكاملة.'
              : 'You now have full access to all platform features including gemstone analysis and the complete encyclopedia.'}
          </p>

          <button
            onClick={handleClose}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl py-3 px-6 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <Sparkles className="size-5" />
            {isAr ? 'ابدأ الاستخدام الآن' : 'Start Using GeoSton'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes successIn {
          from { opacity: 0; transform: scale(0.85) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
