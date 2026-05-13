// AmwalPay SmartBox Integration
// UAT Credentials (replace with production values for live)

export const AMWAL_CONFIG = {
  MID: '194234',
  TID: '659762',
  // NOTE: In production, the secure hash MUST be generated server-side.
  // This key is here only for UAT/demo purposes.
  SECURE_KEY: '0CD1BA6DBFA349B8538BC5D329A6F26B3249B97D853520807D3038AFF2A22492',
  CURRENCY_ID: 512, // OMR
  SCRIPT_URL: 'https://test.amwalpg.com:7443/js/SmartBox.js?v=1.1',
};

// Plan pricing in OMR (Omani Rial) - adjusted for UAT (max 1 OMR for test card)
export const PLAN_PRICES: Record<string, { amount: string; label: string; labelAr: string }> = {
  monthly: { amount: '0.500', label: 'Monthly Plan', labelAr: 'الخطة الشهرية' },
  quarterly: { amount: '0.750', label: '3-Month Plan', labelAr: 'خطة 3 أشهر' },
  yearly: { amount: '1.000', label: 'Yearly Plan', labelAr: 'الخطة السنوية' },
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

/**
 * Generates HMAC-SHA256 secure hash using Web Crypto API (browser-side).
 * ⚠️ In production, ALWAYS generate this on your backend server.
 * This is for UAT/demo purposes only.
 */
async function generateSecureHash(params: Record<string, string>): Promise<string> {
  // Sort alphabetically and build string
  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}=${params[k]}`)
    .join('&');

  // Convert hex key to bytes
  const keyHex = AMWAL_CONFIG.SECURE_KEY;
  const keyBytes = new Uint8Array(keyHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

  // Import key
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Sign
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(sorted));

  // Convert to uppercase hex
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

/**
 * Load the AmwalPay SmartBox script dynamically
 */
function loadSmartBoxScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.SmartBox) {
      resolve();
      return;
    }
    const existing = document.getElementById('amwal-smartbox-script');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }
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
  returnUrl?: string;
  cancelUrl?: string;
}

/**
 * Initiates an AmwalPay SmartBox checkout popup.
 */
export async function initiateAmwalPayment(options: InitiatePaymentOptions): Promise<void> {
  const {
    planId,
    userId,
    language = 'en',
    returnUrl = `${window.location.origin}/payment/success`,
    cancelUrl = `${window.location.origin}/payment/cancel`,
  } = options;

  const planInfo = PLAN_PRICES[planId];
  if (!planInfo) throw new Error(`Unknown plan: ${planId}`);

  // Load SmartBox script
  await loadSmartBoxScript();

  // Wait for SmartBox to initialize
  await new Promise((r) => setTimeout(r, 300));

  if (!window.SmartBox) {
    throw new Error('SmartBox failed to initialize');
  }

  const merchantReference = `${planId.toUpperCase()}-${userId}-${Date.now()}`;
  const trxDateTime = new Date().toISOString();

  // Build hash params (must match exactly what SmartBox sends)
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

  // Configure SmartBox
  window.SmartBox.Checkout.configure = {
    MID: AMWAL_CONFIG.MID,
    TID: AMWAL_CONFIG.TID,
    CurrencyId: AMWAL_CONFIG.CURRENCY_ID,
    AmountTrxn: planInfo.amount,
    MerchantReference: merchantReference,
    LanguageId: language,
    PaymentViewType: 1, // Popup
    TrxDateTime: trxDateTime,
    SessionToken: '',
    ContactInfoType: 1,
    ReturnUrl: returnUrl,
    CancelUrl: cancelUrl,
    ReturnUrlMethodType: 'Post',
    CheckoutSiteMode: 'offsite',
    IgnoreReceipt: 'false',
    SecureHash: secureHash,
    SmartBoxColorConfig: { PrimaryColor: '#2563EB' },
  };

  // Launch the payment popup
  window.SmartBox.Checkout.showSmartBox();
}
