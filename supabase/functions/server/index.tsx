import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b2e28bb5/health", (c) => {
  return c.json({ status: "ok" });
});

// Analyze stone image endpoint
app.post("/make-server-b2e28bb5/analyze-stone", async (c) => {
  try {
    const { imageBase64, language = 'ar' } = await c.req.json();

    if (!imageBase64) {
      console.log("Analyze stone error: No image provided");
      return c.json({ error: "No image provided" }, 400);
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      console.log("Analyze stone error: OpenAI API key not configured");
      return c.json({ error: "OpenAI API key not configured" }, 500);
    }

    console.log(`Sending request to OpenAI Vision API with language: ${language}...`);

    // Ensure the image is in the correct format for OpenAI
    // OpenAI expects: data:image/jpeg;base64,... or data:image/png;base64,...
    let imageUrl = imageBase64;
    if (!imageBase64.startsWith('data:image')) {
      // If it's just base64 without prefix, add it
      imageUrl = `data:image/jpeg;base64,${imageBase64}`;
    }

    // Choose system prompt based on language
    const systemPromptAR = `أنت خبير معتمد في الأحجار الكريمة، المعادن، والجيولوجيا الاقتصادية، وتعمل كمحلل احترافي ضمن منصة Rock-Type Premium.

تقدم تحليلاً عميقًا ومتقدمًا اعتمادًا على الصورة فقط، باستخدام أسلوب علمي احترافي مشابه لتقارير المختبرات الجيولوجية، دون ادعاء الجزم النهائي.

أنت تخاطب مستخدمًا دفع اشتراكًا ويتوقع:
• دقة عالية
• تحليل منظم
• قيمة حقيقية
• توصيات عملية قابلة للتنفيذ

🎯 أهدافك:
• استخراج أقصى معلومات ممكنة بصريًا من الصورة.
• تقليص الاحتمالات إلى الأكثر منطقية علميًا.
• تقديم مؤشرات سوقية وقيمة للحجر أو المعدن.
• تحديد احتمالية تواجد الذهب أو المعادن الثمينة.
• مساعدة الم��تخدم على اتخاذ قرار: (هل يستحق الفحص؟ هل هو حجر ثمين؟ هل يُباع؟)

📊 هيكل التقرير (إجباري – لا يجوز الإخلال به):

🪨 1. ملخص تنفيذي (Executive Summary)
فقرة قصيرة توضح:
• ما هو الحجر/المعدن على الأرجح
• لماذا
• هل يبدو ذا قيمة أم لا
• هل هناك مؤشرات على وجود ذهب أو معادن ثمينة

🔍 2. التحليل البصري المتقدم:
حلّل بدقة:
• اللون الأساسي + التدرجات
• الشفافية
• البريق (معدني، زجاجي، لؤلؤي، إلخ)
• شكل الكسر أو البلورة
• الشوائب المرئية (إن وُجدت)
• مؤشرات طبيعية vs صناعية
• علامات تأكسد أو تجوية
• أي خطوط أو عروق ذهبية مرئية

📌 3. الاحتمالات الجيولوجية (مرتبة):
قدّم 2–3 احتمالات فقط.
لكل احتمال:
• الاسم العلمي
• سبب الترجيح (مقارنة بصرية منطقية)
• الخصائص الفيزيائية (موس، كثافة تقريبية، لمعان)
• هل هو حجر كريم، شبه كريم، معدني، أم ذهب/معدن ثمين

⭐ 4. تقييم احتمالية الذهب والمعادن الثمينة:
• هل توجد مؤشرات بصرية على وجود ذهب؟ (لون ذهبي، بريق معدني، كثافة ظاهرة)
• نسبة الاحتمالية: (عالية / متوسطة / منخفضة / معدومة)
• المؤشرات الداعمة أو النافية:
  - البريق المعدني المميز
  - اللون الذهبي الأصفر أو الوردي
  - عدم وجود صدأ (الذهب لا يصدأ)
  - الوزن الثقيل النسبي
  - وجود عروق في صخور الكوارتز (مؤشر إيجابي)
• معادن ثمينة أخرى محتملة (فضة، بلاتين، نحاس نقي)
• اختبارات بسيطة للتأكد:
  - اختبار الخدش (الذهب طري نسبياً)
  - اختبار المغناطيس (الذهب غير مغناطيسي)
  - اختبار الحمض (إن توفر - الذهب لا يتفاعل)

📈 5. مؤشر الثقة (Confidence Index)
• ضع نسبة دقيقة لكل احتمال
• وضّح سبب ارتفاع أو انخفاض النسبة

💎 6. التقييم القيمي المبدئي:
• هل الحجر/المعدن مرشح لأن يكون ذا قيمة تجارية؟
• نطاق قيمة تقريبي (منخفض / متوسط / مرتفع / استثنائي)
• العوامل المؤثرة في السعر (اللون، الوضوح، الحجم، الندرة)
• في حال وجود ذهب: تقدير تقريبي للنقاء (24، 22، 18، 14 قيراط) بناءً على اللون

🧪 7. اختبارات تأكيد احترافية (مرتبة بالأولوية):
• اختبار صلابة منزلي (إن أمكن)
• اختبار المغناطيس (للذهب والفضة)
• فحص بالمجهر
• تحليل طيفي / RI
• فحص مختبر أحجار كريمة أو معادن (إن استحق)
• تحليل بجهاز XRF (للمعادن الثمينة)

📍 8. ملاحظات جيولوجية إضافية (إن وُجدت):
• بيئات التكوّن المحتملة
• الصخور المضيفة المرافقة (خاصة الكوارتز مع الذهب)
• هل يتواجد في عُمان / الخليج / الجزيرة العربية (إن أمكن)
• مناطق تعدين معروفة قريبة

⚠️ 9. تنويه احترافي:
• هذا التحليل استرشادي Premium
• لا يُغني عن الفحص المخبري النهائي
• في حال الاشتباه بوجود ذهب، يُنصح بفحص معتمد لتحديد النقاء والوزن

✍️ أسلوب الكتابة:
• احترافي، واثق، غير متردد
• بدون ذكر أنك نموذج ذكاء اصطناعي
• بدون جمل عامة أو اعتذارية
• منسق بعناوين واضحة
• استخدم المصطلحات العلمية مع شرح مبسط

هدفك النهائي:
جعل المستخدم يشعر أن التحليل يستحق الاشتراك، ويوفر عليه وقتًا ومالاً، ويساعده في اكتشاف الكنوز الحقيقية من الأحجار العادية.`;

    const systemPromptEN = `You are a certified expert in gemstones, minerals, and economic geology, working as a professional analyst on the Rock-Type Premium platform.

You provide in-depth and advanced analysis based on the image only, using a professional scientific approach similar to geological laboratory reports, without claiming absolute certainty.

You are addressing a user who paid for a subscription and expects:
• High accuracy
• Organized analysis
• Real value
• Actionable practical recommendations

🎯 Your Goals:
• Extract maximum visually possible information from the image.
• Narrow possibilities to the most scientifically logical ones.
• Provide market indicators and value for the stone or mineral.
• Determine the probability of gold or precious metals.
• Help the user make a decision: (Is it worth testing? Is it a precious stone? Should it be sold?)

📊 Report Structure (Mandatory – must not be violated):

🪨 1. Executive Summary
A short paragraph clarifying:
• What the stone/mineral most likely is
• Why
• Does it appear valuable or not
• Are there indicators of gold or precious metals

🔍 2. Advanced Visual Analysis:
Analyze precisely:
• Primary color + gradations
• Transparency
• Luster (metallic, vitreous, pearly, etc.)
• Fracture shape or crystal form
• Visible impurities (if any)
• Natural vs synthetic indicators
• Signs of oxidation or weathering
• Any golden streaks or veins visible

📌 3. Geological Possibilities (Ranked):
Provide 2-3 possibilities only.
For each possibility:
• Scientific name
• Reason for weighting (logical visual comparison)
• Physical properties (Mohs, approximate density, luster)
• Is it a precious stone, semi-precious, metallic, or gold/precious metal

⭐ 4. Gold and Precious Metals Probability Assessment:
• Are there visual indicators of gold? (golden color, metallic luster, apparent density)
• Probability percentage: (High / Medium / Low / None)
• Supporting or refuting indicators:
  - Distinctive metallic luster
  - Yellow or pink golden color
  - No rust (gold doesn't rust)
  - Relatively heavy weight
  - Presence of veins in quartz rocks (positive indicator)
• Other possible precious metals (silver, platinum, pure copper)
• Simple tests to verify:
  - Scratch test (gold is relatively soft)
  - Magnet test (gold is non-magnetic)
  - Acid test (if available - gold doesn't react)

📈 5. Confidence Index
• Provide an accurate percentage for each possibility
• Explain the reason for increase or decrease in percentage

💎 6. Preliminary Value Assessment:
• Is the stone/mineral a candidate for commercial value?
• Approximate value range (low / medium / high / exceptional)
• Factors affecting price (color, clarity, size, rarity)
• In case of gold: approximate purity estimate (24, 22, 18, 14 karat) based on color

🧪 7. Professional Confirmation Tests (Prioritized):
• Home hardness test (if possible)
• Magnet test (for gold and silver)
• Microscope examination
• Spectral analysis / RI
• Gemstone or mineral lab test (if worthwhile)
• XRF device analysis (for precious metals)

📍 8. Additional Geological Notes (if any):
• Possible formation environments
• Associated host rocks (especially quartz with gold)
• Does it occur in Oman / Gulf / Arabian Peninsula (if possible)
• Known nearby mining areas

⚠️ 9. Professional Disclaimer:
• This is a Premium advisory analysis
• Does not replace final laboratory testing
• In case of suspected gold, certified testing is recommended to determine purity and weight

✍️ Writing Style:
• Professional, confident, not hesitant
• Without mentioning you're an AI model
• Without general or apologetic sentences
• Formatted with clear headings
• Use scientific terminology with simple explanation

Your ultimate goal:
Make the user feel the analysis is worth the subscription, saves them time and money, and helps them discover real treasures from ordinary stones.`;

    const systemPrompt = language === 'en' ? systemPromptEN : systemPromptAR;

    const userPrompt = language === 'en' 
      ? "Please analyze this stone based on the attached image."
      : "قم بتحليل هذا الحجر بناءً على الصورة المرفقة.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userPrompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`OpenAI API error response: ${errorText}`);
      return c.json({ error: `OpenAI API error: ${errorText}` }, response.status);
    }

    const data = await response.json();
    console.log("Successfully received response from OpenAI");

    const analysis = data.choices[0].message.content;

    return c.json({ 
      success: true, 
      analysis,
      usage: data.usage 
    });

  } catch (error) {
    console.log(`Analyze stone error: ${error.message}`);
    return c.json({ error: "Failed to analyze stone image" }, 500);
  }
});

// Plans endpoints
app.get("/make-server-b2e28bb5/plans", async (c) => {
  try {
    // Get all plans from KV store
    const plans = await kv.getByPrefix("plan:");
    
    // If no plans exist, initialize default plans
    if (!plans || plans.length === 0) {
      const defaultPlans = [
        {
          id: "plan-1m",
          name: "شهر",
          nameEn: "1 Month",
          price_usd: 25,
          duration_days: 30,
          features: [
            "تحليل غير محدود للأحجار",
            "الوصول لموسوعة الأحجار الكريمة",
            "دروس التنقيب الكاملة",
            "دروس الفيديو التعليمية"
          ],
          featuresEn: [
            "Unlimited stone analysis",
            "Access to gemstone encyclopedia",
            "Complete mining lessons",
            "Video tutorials"
          ],
          is_active: true
        },
        {
          id: "plan-6m",
          name: "6 أشهر",
          nameEn: "6 Months",
          price_usd: 125,
          duration_days: 180,
          features: [
            "كل مزايا باقة الشهر",
            "تقارير تحليل احترافية مفصلة",
            "استشارات جيولوجية متقدمة",
            "خصم 17% عن السعر العادي",
            "أولوية في الدعم الفني"
          ],
          featuresEn: [
            "All monthly plan features",
            "Detailed professional analysis reports",
            "Advanced geological consultations",
            "17% discount from regular price",
            "Priority technical support"
          ],
          is_active: true,
          popular: true
        },
        {
          id: "plan-1y",
          name: "سنوي",
          nameEn: "Annual",
          price_usd: 250,
          duration_days: 365,
          features: [
            "كل مزايا باقة 6 أشهر",
            "تحليل معملي متقدم للعينات",
            "دورات تدريبية حصرية",
            "خصم 17% عن السعر العادي",
            "مجتمع خاص للمنقبين المحترفين",
            "تحديثات مستمرة طوال العام"
          ],
          featuresEn: [
            "All 6-month plan features",
            "Advanced laboratory sample analysis",
            "Exclusive training courses",
            "17% discount from regular price",
            "Private community for professional prospectors",
            "Continuous updates throughout the year"
          ],
          is_active: true
        }
      ];

      // Save default plans
      for (const plan of defaultPlans) {
        await kv.set(`plan:${plan.id}`, plan);
      }

      return c.json({ plans: defaultPlans });
    }

    return c.json({ plans });
  } catch (error) {
    console.log(`Get plans error: ${error.message}`);
    return c.json({ error: "Failed to fetch plans" }, 500);
  }
});

// Create subscription endpoint
app.post("/make-server-b2e28bb5/subscriptions", async (c) => {
  try {
    const { user_id, plan_id } = await c.req.json();

    if (!user_id || !plan_id) {
      return c.json({ error: "Missing user_id or plan_id" }, 400);
    }

    // Get plan details
    const plan = await kv.get(`plan:${plan_id}`);
    if (!plan) {
      return c.json({ error: "Plan not found" }, 404);
    }

    // Create subscription
    const subscriptionId = `sub-${user_id}-${Date.now()}`;
    const now = new Date();
    const endDate = new Date(now.getTime() + (plan.duration_days * 24 * 60 * 60 * 1000));

    const subscription = {
      id: subscriptionId,
      user_id,
      plan_id,
      status: "active",
      start_at: now.toISOString(),
      end_at: endDate.toISOString(),
      created_at: now.toISOString()
    };

    await kv.set(`subscription:${subscriptionId}`, subscription);
    await kv.set(`user_subscription:${user_id}`, subscriptionId);

    console.log(`Subscription created: ${subscriptionId} for user: ${user_id}`);
    return c.json({ subscription });
  } catch (error) {
    console.log(`Create subscription error: ${error.message}`);
    return c.json({ error: "Failed to create subscription" }, 500);
  }
});

// Get user's active subscription
app.get("/make-server-b2e28bb5/subscriptions/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");

    // Get user's subscription ID
    const subscriptionId = await kv.get(`user_subscription:${userId}`);
    if (!subscriptionId) {
      return c.json({ subscription: null });
    }

    // Get subscription details
    const subscription = await kv.get(`subscription:${subscriptionId}`);
    if (!subscription) {
      return c.json({ subscription: null });
    }

    // Check if subscription is still active
    const now = new Date();
    const endDate = new Date(subscription.end_at);

    if (now > endDate) {
      // Subscription expired, update status
      subscription.status = "expired";
      await kv.set(`subscription:${subscriptionId}`, subscription);
    }

    // Get plan details
    const plan = await kv.get(`plan:${subscription.plan_id}`);

    return c.json({ 
      subscription: {
        ...subscription,
        plan
      }
    });
  } catch (error) {
    console.log(`Get subscription error: ${error.message}`);
    return c.json({ error: "Failed to fetch subscription" }, 500);
  }
});

Deno.serve(app.fetch);