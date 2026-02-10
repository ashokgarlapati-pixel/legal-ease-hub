import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const WEBHOOK_URL = "https://road-77.app.n8n.cloud/webhook-test/48ef630b-e5d9-486c-8020-0b416bc354d5";

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
    const formData = await req.formData();

    // Forward the form data to the n8n webhook
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Webhook error:", response.status, responseText);
      return new Response(
        JSON.stringify({ error: `Webhook returned ${response.status}`, details: responseText }),
        { status: response.status, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(responseText, {
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
