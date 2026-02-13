import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const WEBHOOK_URL = "https://jxnxrdhxn.app.n8n.cloud/webhook-test/legalmind";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Read raw body and content-type to forward exactly as-is
    const contentType = req.headers.get("content-type") || "";
    const rawBody = await req.arrayBuffer();

    console.log("Forwarding request to webhook:", WEBHOOK_URL);
    console.log("Content-Type:", contentType);
    console.log("Body size:", rawBody.byteLength, "bytes");

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: rawBody,
    });

    const responseText = await response.text();
    console.log("Webhook response status:", response.status, "body:", responseText);

    if (!response.ok) {
      console.error("Webhook error:", response.status, responseText);
      return new Response(
        JSON.stringify({ error: `Webhook returned ${response.status}`, details: responseText }),
        { status: response.status, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const jsonBody = responseText && responseText.trim()
      ? responseText
      : JSON.stringify({ success: true });

    return new Response(jsonBody, {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
