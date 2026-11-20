interface SendEmailParams {
  to: string;
  leaderName: string;
  teamName: string;
  event: "automate" | "quant";
  eventName: string;
  referenceId: string;
  college: string;
  members: { name: string; email: string }[];
}
export async function sendRegistrationConfirmationEmail(params: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY is not set. Skipping confirmation email.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Automate x Quant <onboarding@resend.dev>";
  const trackColor = params.event === "automate" ? "#22E5FF" : "#19F58A";
  const membersListHtml =
    params.members.length > 0
      ? params.members
          .map((m, idx) => `<li style="margin-bottom: 4px; color: #CBD5E1;">${idx + 2}. ${m.name} (${m.email})</li>`)
          .join("")
      : `<li style="color: #94A3B8; font-style: italic;">Solo Entry (Team Leader only)</li>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Registration Confirmed - ${params.eventName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020B1F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F1F5F9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #020B1F; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #040F24; border: 1px solid #1E3A6E; border-radius: 8px; overflow: hidden; box-shadow: 0 12px 36px rgba(0,0,0,0.6);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #071A3E 0%, #040F24 100%); padding: 28px 24px; border-bottom: 2px solid ${trackColor}; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #A3F06D;">
                Vo'ISE • MSRIT ISE PRESENTS
              </p>
              <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 0.05em; color: #FFFFFF;">
                AUTOMATE × QUANT
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: ${trackColor}; font-weight: 600;">
                ★ REGISTRATION CONFIRMED ★
              </p>
            </td>
          </tr>

          <!-- Ticket Box -->
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.5; color: #E2E8F0;">
                Hello <strong>${params.leaderName}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5; color: #94A3B8;">
                Your team registration for <strong>${params.eventName}</strong> at MSRIT ISE has been successfully confirmed. Save this email as your official entry pass on event day.
              </p>

              <!-- Ticket Badge -->
              <div style="background-color: #071938; border: 1px dashed #2E5894; border-radius: 6px; padding: 18px; margin-bottom: 24px;">
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom: 8px;">
                      <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #94A3B8;">REFERENCE PASS ID</span>
                      <div style="font-family: monospace; font-size: 17px; font-weight: 700; color: #A3F06D; margin-top: 2px;">
                        ${params.referenceId}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 8px; border-top: 1px solid #142E5A;">
                      <table width="100%">
                        <tr>
                          <td style="font-size: 13px; color: #94A3B8;">Team Name:</td>
                          <td align="right" style="font-size: 13px; font-weight: 700; color: #FFFFFF;">${params.teamName}</td>
                        </tr>
                        <tr>
                          <td style="font-size: 13px; color: #94A3B8; padding-top: 4px;">Track:</td>
                          <td align="right" style="font-size: 13px; font-weight: 700; color: ${trackColor}; padding-top: 4px;">${params.eventName}</td>
                        </tr>
                        <tr>
                          <td style="font-size: 13px; color: #94A3B8; padding-top: 4px;">Institution:</td>
                          <td align="right" style="font-size: 13px; color: #E2E8F0; padding-top: 4px;">${params.college}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Event Logistics -->
              <div style="background-color: #020B1F; border: 1px solid #142E5A; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #A3F06D;">
                  EVENT DETAILS &amp; VENUE
                </h3>
                <table width="100%" style="font-size: 13px; color: #CBD5E1;">
                  <tr>
                    <td style="padding: 4px 0; color: #94A3B8; width: 85px;">📅 Date:</td>
                    <td style="padding: 4px 0; font-weight: 600; color: #FFFFFF;">Thursday, 26 November 2026</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #94A3B8;">⏰ Time:</td>
                    <td style="padding: 4px 0; font-weight: 600; color: #FFFFFF;">09:00 AM – 05:00 PM IST</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #94A3B8;">📍 Venue:</td>
                    <td style="padding: 4px 0; font-weight: 600; color: #FFFFFF;">Department of ISE, Ramaiah Institute of Technology (MSRIT), MSR Nagar, Bengaluru - 560054</td>
                  </tr>
                </table>
              </div>

              <!-- Team Roster -->
              <div style="margin-bottom: 24px;">
                <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #94A3B8;">
                  REGISTERED TEAM ROSTER
                </h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px;">
                  <li style="margin-bottom: 4px; color: #FFFFFF;"><strong>Leader:</strong> ${params.leaderName} (${params.to})</li>
                  ${membersListHtml}
                </ul>
              </div>

              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #64748B;">
                Need help or have queries? Feel free to reply to this email or contact the Vo'ISE coordinators at MSRIT ISE.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #020919; padding: 18px 24px; border-top: 1px solid #142E5A; text-align: center; font-size: 11px; color: #475569;">
              <p style="margin: 0 0 4px 0;">Vo'ISE • Department of ISE • Ramaiah Institute of Technology</p>
              <p style="margin: 0;">Automate × Quant 2026 • All Rights Reserved</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [params.to],
        subject: `[Pass Confirmed] ${params.eventName} 2026 - ${params.teamName}`,
        html,
      }),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      console.error("[resend error]", errorJson);
      return { success: false, error: JSON.stringify(errorJson) };
    }

    const data = await res.json();
    console.log("[resend success]", data);
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email exception]", msg);
    return { success: false, error: msg };
  }
}
