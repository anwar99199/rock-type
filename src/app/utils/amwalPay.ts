// Updated: Return URL changed to root path with query params.
// This avoids 404 on Vercel SPA deployments where /payment/success
// is not a real server-side route.

export const AMWAL_CONFIG = {
  MID: '120576',
  TID: '652956',
  SECURE_KEY: '246D711A0D0A3B077E77A999901A1AD8E4EE797754F7962523C1C46070DA1280',
  CURRENCY_ID: 512, // OMR
  SCRIPT_URL: 'https://checkout.amwalpg.com/js/SmartBox.js?v=1.1',
};

export const PLAN_PRICES: Record<string, { amount: string; label: string; labelAr: string }> = {
  monthly:   { amount: '5.000',  label: 'Monthly Plan',  labelAr: 'الخطة الشهرية' },
  quarterly: { amount: '9.000',  label: '3-Month Plan',  labelAr: 'خطة 3 أشهر'    },
  yearly:    { amount: '37.000', label: 'Yearly Plan',   labelAr: 'الخطة السنوية' },
};

export const PLAN_DURATION_DAYS: Record<string, number> = {
  monthly: 30,
  quarterly: 90,
  yearly: 365,
};

declare global {
  interface Window {
    SmartBox?: {
      Checkout: {
        configure: Record<string, any>;
        showSmartBox: () => void;
      };
    };
  }
}

async function generateSecureHash(params: Record<string, string>): Promise<string> {
  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}=${params[k]}`)
    .join('&');

  const keyHex = AMWAL_CONFIG.SECURE_KEY;
  const keyBytes = new Uint8Array(keyHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(sorted));

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

function loadSmartBoxScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.SmartBox) { resolve(); return; }
    const existing = document.getElementById('amwal-smartbox-script');
    if (existing) { existing.addEventListener('load', () => resolve()); return; }
    const script = document.createElement('script');
    script.id = 'amwal-smartbox-script';
    script.src = AMWAL_CONFIG.SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load AmwalPay SmartBox'));
    document.head.appendChild(script);
  });
}

export interface InitiatePaymentOptions {
  planId: string;
  userId: string;
  userEmail?: string;
  language?: 'en' | 'ar';
}

export async function initiateAmwalPayment(options: InitiatePaymentOptions): Promise<void> {
  const { planId, userId, language = 'en' } = options;

  const planInfo = PLAN_PRICES[planId];
  if (!planInfo) throw new Error(`Unknown plan: ${planId}`);

  await loadSmartBoxScript();
  await new Promise((r) => setTimeout(r, 300));
  if (!window.SmartBox) throw new Error('SmartBox failed to initialize');

  const merchantReference = `${planId.toUpperCase()}-${userId.slice(0, 8)}-${Date.now()}`;
  const trxDateTime = new Date().toISOString();

  // Store plan + user info in localStorage so PaymentReturnPage can save subscription
  localStorage.setItem('pending_payment', JSON.stringify({
    planId,
    userId,
    merchantReference,
    timestamp: Date.now(),
  }));

  // Use root URL with query params — works on Vercel SPA without 404
  const returnUrl = `${window.location.origin}/?payment=success&plan=${planId}`;
  const cancelUrl = `${window.location.origin}/?payment=cancelled`;

  const hashParams: Record<string, string> = {
    Amount: planInfo.amount,
    CurrencyId: String(AMWAL_CONFIG.CURRENCY_ID),
    MerchantId: AMWAL_CONFIG.MID,
    MerchantReference: merchantReference,
    RequestDateTime: trxDateTime,
    SessionToken: '',
    TerminalId: AMWAL_CONFIG.TID,
  };

  const secureHash = await generateSecureHash(hashParams);

  window.SmartBox.Checkout.configure = {
    MID: AMWAL_CONFIG.MID,
    TID: AMWAL_CONFIG.TID,
    CurrencyId: AMWAL_CONFIG.CURRENCY_ID,
    AmountTrxn: planInfo.amount,
    MerchantReference: merchantReference,
    LanguageId: language,
    PaymentViewType: 1,
    TrxDateTime: trxDateTime,
    SessionToken: '',
    ContactInfoType: 1,
    ReturnUrl: returnUrl,
    CancelUrl: cancelUrl,
    ReturnUrlMethodType: 'Get',
    CheckoutSiteMode: 'offsite',
    IgnoreReceipt: 'false',
    SecureHash: secureHash,
    SmartBoxColorConfig: { PrimaryColor: '#2563EB' },
  };

  window.SmartBox.Checkout.showSmartBox();
}
