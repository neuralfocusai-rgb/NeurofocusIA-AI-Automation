/**
 * 🤖 neuralFocusAI - Autonomous Lead Pipeline
 * Description: Automatically pushes qualified leads from an AI Agent/Form 
 * into a centralized CRM or Google Sheets webhook.
 * Year: 2026
 */

const CRM_WEBHOOK_URL = "https://api.neuralfocusai.com/v1/webhook/leads";

async function sendLeadToCRM(leadData) {
    const payload = {
        timestamp: new Date().toISOString(),
        source: "WhatsApp AI Agent",
        clientName: leadData.name || "Unknown",
        businessName: leadData.business || "Not Provided",
        phone: leadData.phone,
        painPoint: leadData.painPoint || "Manual data entry overhead",
        status: "Qualified"
    };

    try {
        console.log(`🚀 [neuralFocusAI] Sending qualified lead: ${payload.clientName}...`);
        
        const response = await fetch(CRM_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer NF_AI_PROD_2026_SECURE_KEY"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("✅ [SUCCESS] Lead successfully synced with CRM.");
            return true;
        } else {
            console.error(`❌ [ERROR] Webhook rejected data with status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("❌ [CRITICAL ERROR] Failed to connect to CRM pipeline:", error.message);
        return false;
    }
}

// Example usage representing an incoming qualified lead from WhatsApp:
const qualifiedMockLead = {
    name: "Carlos Mendoza",
    business: "Clínica Médica Central",
    phone: "+5491123456789",
    painPoint: "Secretaries spending 4 hours/day manual scheduling"
};

sendLeadToCRM(qualifiedMockLead);
