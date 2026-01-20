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
            role: "user",
            content: [
              {
                type: "text",
                text: "قم بتحليل هذه الصورة وتحديد نوع الحجر أو المعدن. قدم المعلومات التالية بالعربية:\n\n1. اسم الحجر أو المعدن\n2. النوع والتصنيف\n3. الخصائص الفيزيائية (اللون، الصلابة، اللمعان)\n4. الاستخدامات الشائعة\n5. أماكن تواجده\n6. القيمة والندرة\n7. معلومات إضافية مفيدة\n\nإذا لم تكن متأكداً من النوع، اذكر الاحتمالات المختلفة.",
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
        max_tokens: 1000,
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
