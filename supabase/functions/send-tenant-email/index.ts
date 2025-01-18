import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string[];
  subject: string;
  content: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Handling email request');
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      throw new Error("Email sending configuration missing");
    }

    const emailRequest: EmailRequest = await req.json();
    console.log("Email request received:", {
      to: emailRequest.to,
      subject: emailRequest.subject
    });

    // Vérifier si nous sommes en mode test (pas de domaine vérifié)
    const isTestMode = true; // À changer une fois le domaine vérifié
    const fromEmail = isTestMode ? 
      "onboarding@resend.dev" : 
      "notifications@your-verified-domain.com"; // Remplacer par votre domaine vérifié

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Property Management <${fromEmail}>`,
        to: isTestMode ? ["jaureskangah2016@gmail.com"] : emailRequest.to, // En mode test, envoyer uniquement à votre email
        subject: emailRequest.subject,
        html: emailRequest.content,
      }),
    });

    const resendResponse = await res.json();
    console.log("Resend API response:", resendResponse);

    if (!res.ok) {
      console.error("Error from Resend API:", resendResponse);
      throw new Error(`Failed to send email: ${JSON.stringify(resendResponse)}`);
    }

    console.log("Email sent successfully");
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in send-tenant-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);