// Updated: On successful payment return from AmwalPay, saves payment and
// subscription records to Supabase database tables.
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CheckCircle, XCircle, Gem, ArrowLeft, Loader } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAuth, supabase } from '@/app/contexts/AuthContext';

const PLAN_DURATION: Record<string, number> = {
  monthly: 30,
  quarterly: 90,
  yearly: 365,
};

export function PaymentReturnPage() {
  const [params] = useSearchParams();
  const { language, dir } = useLanguage();
  const { user } = useAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed' | 'cancelled'>('processing');
  const [transactionId, setTransactionId] = useState<string>('');
  const [saved, setSaved] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    const responseCode = params.get('responseCode') || params.get('ResponseCode');
    const paymentParam = params.get('payment');
    const txnId = params.get('transactionId') || params.get('TransactionId') || '';
    const planId = params.get('plan') || 'monthly';
    const merchantRef = params.get('merchantReference') || params.get('MerchantReference') || '';
    const amount = params.get('amount') || params.get('Amount') || '';

    setTransactionId(txnId);

    const isSuccess = paymentParam === 'success' || responseCode === '00';
    const isCancelled = paymentParam === 'cancelled';

    if (isSuccess) {
      setStatus('success');
      // Save to Supabase if user is logged in and not already saved
      if (user && !saved) {
        setSaved(true);
        savePaymentToSupabase({ userId: user.id, planId, txnId, merchantRef, amount, responseCode: responseCode || '00' });
      }
    } else if (isCancelled) {
      setStatus('cancelled');
    } else if (responseCode) {
      setStatus('failed');
    } else {
      setStatus('cancelled');
    }
  }, [params, user]);

  const savePaymentToSupabase = async ({
    userId, planId, txnId, merchantRef, amount, responseCode
  }: {
    userId: string;
    planId: string;
    txnId: string;
    merchantRef: string;
    amount: string;
    responseCode: string;
  }) => {
    try {
      // Save payment record
      await supabase.from('payments').insert({
        user_id: userId,
        plan_id: planId,
        amount: amount || '0',
        currency: 'OMR',
        transaction_id: txnId || null,
        merchant_reference: merchantRef || null,
        response_code: responseCode,
        status: 'completed',
      });

      // Save subscription record
      const durationDays = PLAN_DURATION[planId] ?? 30;
      const now = new Date();
      const endAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

      await supabase.from('subscriptions').insert({
        user_id: userId,
        plan_id: planId,
        status: 'active',
        start_at: now.toISOString(),
        end_at: endAt.toISOString(),
      });

      console.log('Payment and subscription saved to Supabase');
    } catch (err) {
      console.error('Failed to save payment to Supabase:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 flex items-center justify-center p-4" dir={dir}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

        {status === 'processing' && (
          <>
            <Loader className="size-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? 'جارٍ المعالجة...' : 'Processing...'}
            </h1>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isAr
                ? 'اشتراكك مفعّل الآن. يمكنك البدء باستخدام جميع الميزات.'
                : 'Your subscription is now active. You can start using all features.'}
            </p>
            {transactionId && (
              <div className="bg-green-50 rounded-xl p-4 mb-6 text-sm text-green-700">
                <p className="font-medium">{isAr ? 'معرف المعاملة:' : 'Transaction ID:'}</p>
                <p className="font-mono mt-1 break-all">{transactionId}</p>
              </div>
            )}
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="size-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? 'فشل الدفع' : 'Payment Failed'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isAr
                ? 'لم تتم عملية الدفع. يرجى المحاولة مرة أخرى.'
                : 'Payment was not completed. Please try again.'}
            </p>
          </>
        )}

        {status === 'cancelled' && (
          <>
            <XCircle className="size-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? 'تم إلغاء الدفع' : 'Payment Cancelled'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isAr ? 'لم تُكمل عملية الدفع.' : 'You cancelled the payment process.'}
            </p>
          </>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="size-4" />
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
