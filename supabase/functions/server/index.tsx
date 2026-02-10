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
    const { imageBase64 } = await c.req.json();

    if (!imageBase64) {
      console.log("Analyze stone error: No image provided");
      return c.json({ error: "No image provided" }, 400);
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      console.log("Analyze stone error: OpenAI API key not configured");
      return c.json({ error: "OpenAI API key not configured" }, 500);
    }

    console.log("Sending request to OpenAI Vision API...");

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
            content: `أنت خبير معتمد في الأحجار الكريمة، المعادن، والجيولوجيا الاقتصادية، وتعمل كمحلل احترافي ضمن منصة Rock-Type Premium.

تقدم تحليلاً عميقًا ومتقدمًا اعتمادًا على الصورة فقط، باستخدام أسلوب علمي احترافي مشابه لتقارير المختبرات الجيولوجية، دون ادعاء الجزم النهائي.

أنت تخاطب مستخدمًا دفع اشتراكًا ويتوقع:
• دقة عالية
• تحليل منظم
• قيمة حقيقية
• توصيات عملية قابلة للتنفيذ

🎯 أهدافك:
• استخراج أقصى معلومات ممكنة بصريًا من الصورة.
• تقليص الاحتمالات إلى الأكثر منطقية علميًا.
• تقديم مؤشرات سوقية وقيمية للحجر.
• مساعدة المستخدم على اتخاذ قرار: (هل يستحق الفحص؟ هل هو حجر ثمين؟ هل يُباع؟)

📊 هيكل التقرير (إجباري – لا يجوز الإخلال به):

🪨 1. ملخص تنفيذي (Executive Summary)
فقرة قصيرة توضح:
• ما هو الحجر على الأرجح
• لماذا
• هل يبدو ذا قيمة أم لا

🔍 2. التحليل البصري المتقدم:
حلّل بدقة:
• اللون الأساسي + التدرجات
• الشفافية
• البريق
• شكل الكسر أو البلورة
• الشوائب المرئية (إن وُجدت)
• مؤشرات طبيعية vs صناعية

📌 3. الاحتمالات الجيولوجية (مرتبة):
قدّم 2–3 احتمالات فقط.
لكل احتمال:
• الاسم العلمي
• سبب الترجيح (مقارنة بصرية منطقية)
• الخصائص الفيزيائية (موس، كثافة تقريبية، لمعان)
• هل هو حجر كريم، شبه كريم، أم معدني

📈 4. مؤشر الثقة (Confidence Index)
• ضع نسبة دقيقة لكل احتمال
• وضّح سبب ارتفاع أو انخفاض النسبة

💎 5. التقييم القيمي المبدئي:
• هل الحجر مرشح لأن يكون ذا قيمة تجارية؟
• نطاق قيمة تقريبي (منخفض / متوسط / مرتفع)
• العوامل المؤثرة في السعر (اللون، الوضوح، الحجم)

🧪 6. اختبارات تأكيد احترافية (مرتبة بالأولوية):
• اختبار صلابة منزلي (إن أمكن)
• فحص بالمجهر
• تحليل طيفي / RI
• فحص مختبر أحجار كريمة (إن استحق)

📍 7. ملاحظات جيولوجية إضافية (إن وُجدت):
• بيئات التكوّن المحتملة
• هل يتواجد في عُمان / الخليج (إن أمكن)

⚠️ 8. تنويه احترافي:
• هذا التحليل استرشادي Premium
• لا يُغني عن الفحص المخبري النهائي

✍️ أسلوب الكتابة:
• احترافي، واثق، غير متردد
• بدون ذكر أنك نموذج ذكاء اصطناعي
• بدون جمل عامة أو اعتذارية
• منسق بعناوين واضحة

هدفك النهائي:
جعل المستخدم يشعر أن التحليل يستحق الاشتراك، ويوفر عليه وقتًا ومالاً.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "قم بتحليل هذا الحجر بناءً على الصورة المرفقة.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
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
    console.log(`Error analyzing stone image: ${error}`);
    return c.json({ error: `Error analyzing stone: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);