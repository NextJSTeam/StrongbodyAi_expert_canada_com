import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { MAIL_CONFIG, STRONGBODY_API_BASE_URL, STRONGBODY_API_KEY } from "@/config/api";

const getAdminEmailTemplate = (name: string, email: string, message: string, siteType: string) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #32BDF2, #1DA1D2); padding: 30px; text-align: center; color: white; }
    .content { padding: 30px; color: #000000; line-height: 1.6; }
    .field { margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px; }
    .label { font-size: 11px; text-transform: uppercase; color: #000000; font-weight: bold; margin-bottom: 5px; letter-spacing: 0.1em; }
    .value { font-size: 15px; color: #000000; font-weight: 500; }
    .message-box { background: #f8fafc; border-left: 4px solid #32BDF2; padding: 20px; border-radius: 4px; margin-top: 10px; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #000000; }
    .tag { display: inline-block; padding: 4px 12px; background: #e0f2fe; color: #0369a1; border-radius: 20px; font-size: 11px; font-weight: bold; border: 1px solid #bae6fd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0; font-size: 22px;">New Contact Form Submission</h1>
      <p style="margin:5px 0 0; opacity: 0.9; font-size: 14px;">Source: ${siteType}</p>
    </div>
    <div class="content">
      <div style="text-align: right; margin-bottom: 20px;">
        <span class="tag">${siteType.toUpperCase()}</span>
      </div>
      <div class="field">
        <div class="label">Customer Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Contact Email</div>
        <div class="value"><a href="mailto:${email}" style="color: #32BDF2; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field" style="border:none;">
        <div class="label">Message</div>
        <div class="message-box" style="white-space: pre-wrap;">${message}</div>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${siteType.toUpperCase()} • All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_CONFIG.SMTP_USER,
    pass: MAIL_CONFIG.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, role, message, type } = await req.json();
    const siteType = type || "unknown-site";
    const fullName = `${firstName} ${lastName}`;
    const htmlContent = getAdminEmailTemplate(fullName, email, `[Role: ${role}]\n\n${message}`, siteType);

    // Collect client metadata for API tracking
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'Unknown';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    const language = req.headers.get('accept-language')?.split(',')[0] || 'Unknown';
    const consolidatedUserAgent = `${userAgent} | IP: ${ip} | Country: ${country} | Lang: ${language}`;

    const requestObj = {
        type: siteType,
        role: role,
        message: message,
        userAgent: consolidatedUserAgent,
    };

    const apiUrl = `${STRONGBODY_API_BASE_URL}/v1/public/ldp/inquiries-send-email`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': STRONGBODY_API_KEY,
        },
        body: JSON.stringify({
            fullName: fullName || '',
            email: email || '',
            request: JSON.stringify(requestObj),
        }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok || (responseData.code !== undefined && responseData.code !== 0)) {
        const errorMsg = responseData.message || responseData.error || 'Failed to submit inquiry to API';
        console.error("Error communicating with API:", response.status, errorMsg);
        return NextResponse.json({ success: false, error: errorMsg }, { status: response.status });
    }

    console.log(`Data sent to API successfully for: ${email}`);

    // ----------------------------------------------------------------
    // PART B: SEND EMAIL NOTIFICATION TO ADMIN
    // ----------------------------------------------------------------
    const info = await transporter.sendMail({
      from: `"StrongBody AI System" <${MAIL_CONFIG.SMTP_USER}>`,
      to: MAIL_CONFIG.ADMIN_EMAIL,
      subject: `[${siteType.toUpperCase()}] New Message from ${fullName}`,
      html: htmlContent,
    });
    console.log(`Notification sent to admin from: ${email}, messageId: ${info.messageId}`);

    return NextResponse.json({ success: true, message: "Request completely successful", data: responseData });

  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

