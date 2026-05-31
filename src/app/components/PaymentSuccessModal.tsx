// Fixed: Race condition where user was null when payment return URL loaded.
// Now waits for auth session to restore before saving subscription/payment.
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { CheckCircle, X, Sparkles, Loader } from 'lucide-react';
import { useAuth, supabase } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PLAN_DURATION_DAYS, PLAN_PRICES } from '@/app/utils/amwalPay';

export function PaymentSuccessModal() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [planId, setPlanId] = useState('monthly');
  const savedRef = useRef(false); // Use ref so it persists across re-renders
  const isAr = language === 'ar';

  // Step 1: Detect payment=success in URL immediately on mount
  useEffect(() => {
    const paymentParam = searchParams.get('payment');
    const responseCode = searchParams.get('responseCode') || searchParams.get('ResponseCode');
    const planParam = searchParams.get('plan') || 'monthly';
    const isSuccess = paymentParam === 'success' || responseCode === '00';

    if (!isSuccess) return;

    setPlanId(planParam);
    setShow(true);

    // Clean URL immediately so refresh doesn't retrigger
    navigate('/', { replace: true });
  }, []); // Only run on mount

  // Step 2: Once auth finishes loading and user is available, save to Supabase
  // This fires AFTER user is restored from session — fixes the race condition
  useEffect(() => {
    if (!show) return;           // Not a payment return
    if (authLoading) return;     // Still waiting for session to restore
    if (savedRef.current) return; // Already saved

    if (!user) {
      // Auth loaded but no user — very unlikely but handle gracefully
      console.warn('Payment success but no user session found');
      return;
    }

    savedRef.current = true;
    setSaving(true);
    saveToSupabase(user.id, planId).finally(() => setSaving(false));
  }, [show, authLoading, user]);

  const saveToSupabase = async (userId: string, plan: string) => {
    try {
      const pending = localStorage.getItem('pending_payment');
      const pendingData = pending ? JSON.parse(pending) : {};
      localStorage.removeItem('pending_payment');

      const durationDays = PLAN_DURATION_DAYS[plan] ?? 30;
      const now = new Date();
      const endAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

      // Deactivate any existing active subscriptions for this user
      const { error: deactivateError } = await supabase
        .from('subscriptions')
        .update({ status: 'inactive' })
        .eq('user_id', userId)
        .eq('status', 'active');

      if (deactivateError) console.error('Deactivate error:', deactivateError);

      // Insert new active subscription
      const { error: subError } = await supabase.from('subscriptions').insert({
        user_id: userId,
        plan_id: plan,
        status: 'active',
        start_at: now.toISOString(),
        end_at: endAt.toISOString(),
      });

      if (subError) {
        console.error('Subscription insert error:', subError);
      } else {
        console.log('✅ Subscription saved');
      }

      // Save payment record
      // Note: txnId won't be in searchParams since we navigated away — use pendingData
      const { error: payError } = await supabase.from('payments').insert({
        user_id: userId,
        plan_id: plan,
        amount: PLAN_PRICES[plan]?.amount || '0',
        currency: 'OMR',
        transaction_id: pendingData.transactionId || null,
        merchant_reference: pendingData.merchantReference || null,
        response_code: '00',
        status: 'completed',
      });

      if (payError) {
        console.error('Payment insert error:', payError);
      } else {
        console.log('✅ Payment saved');
      }
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
    }
  };

  if (!show) return null;

  const planLabel = isAr
    ? PLAN_PRICES[planId]?.labelAr
    : PLAN_PRICES[planId]?.label;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShow(false)} />

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
          onClick={() => setShow(false)}
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
            <p className="text-green-600 text-xs mt-1 flex items-center justify-center gap-1">
              {saving ? (
                <>
                  <Loader className="size-3 animate-spin" />
                  {isAr ? 'جارٍ تفعيل الاشتراك...' : 'Activating subscription...'}
                </>
              ) : (
                isAr ? 'اشتراكك مفعّل الآن ويمكنك البدء فوراً' : 'Your subscription is now active'
              )}
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {isAr
              ? 'يمكنك الآن الوصول إلى جميع ميزات المنصة بما فيها تحليل الأحجار الكريمة والموسوعة الكاملة.'
              : 'You now have full access to all platform features including gemstone analysis and the complete encyclopedia.'}
          </p>

          <button
            onClick={() => setShow(false)}
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl py-3 px-6 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
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
