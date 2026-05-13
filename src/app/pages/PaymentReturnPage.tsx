import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CheckCircle, XCircle, Gem, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function PaymentReturnPage() {
  const [params] = useSearchParams();
  const { language, dir } = useLanguage();
  const [status, setStatus] = useState<'success' | 'failed' | 'cancelled' | 'unknown'>('unknown');
  const isAr = language === 'ar';

  useEffect(() => {
    // AmwalPay sends responseCode "00" for success
    const responseCode = params.get('responseCode') || params.get('ResponseCode');
    const paymentParam = params.get('payment');

    if (paymentParam === 'success' || responseCode === '00') {
      setStatus('success');
    } else if (paymentParam === 'cancelled') {
      setStatus('cancelled');
    } else if (responseCode) {
      setStatus('failed');
    }
  }, [params]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 flex items-center justify-center p-4" dir={dir}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
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
            <div className="bg-green-50 rounded-xl p-4 mb-6 text-sm text-green-700">
              <p className="font-medium">{isAr ? 'معرف المعاملة:' : 'Transaction ID:'}</p>
              <p className="font-mono mt-1">{params.get('transactionId') || params.get('TransactionId') || 'N/A'}</p>
            </div>
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

        {status === 'unknown' && (
          <>
            <Gem className="size-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isAr ? 'جارٍ المعالجة...' : 'Processing...'}
            </h1>
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
