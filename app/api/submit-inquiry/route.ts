import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const formSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  countryCode: z.string(),
  phoneNumber: z.string().optional(),
  rolesInterested: z.array(z.string()).min(1),
  hiringChallenge: z.string().min(1),
  timeline: z.string().min(1),
  coBrandingConsent: z.boolean(),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = formSchema.parse(body);

    // Create transporter with SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    // Format phone number
    const phoneDisplay = validatedData.phone || 
      (validatedData.phoneNumber ? `${validatedData.countryCode} ${validatedData.phoneNumber}` : 'Not provided');

    // Extract first name from contact name
    const firstName = validatedData.contactName.split(' ')[0] || validatedData.contactName;

    // Email content for the company using custom template
    const emailHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Talent Hub Inquiry Requires Action</title>
  </head>
  <body style="margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #222; background-color: #fff; line-height: 1.5; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="email-wrapper" style="background-color: #eeeeee; padding-top: 60px; padding-bottom: 60px; padding-left: 0; padding-right: 0; width: 100%; max-width: 1920px; margin: 0 auto; ">
      <tr>
        <td align="center" style="padding: 0;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-content" style="background-color: #ffffff; max-width: 600px; margin-top: 0; margin-bottom: 0; margin-left: auto; margin-right: auto; padding-top: 40px; padding-bottom: 40px; padding-left: 40px; padding-right: 40px; box-shadow: 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25); border-radius: 12px;">
            <tr>
              <td style="padding: 0;">
                <a href="https://www.pepagora.com/en?utm_source=email&utm_medium=drip&utm_campaign=talent_hub" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none;">
                <img src="https://images.pepagora.com/pep-emailers/assets/img/logoPepagora.jpg" width="129" height="41" alt="Pepagora Logo" style="display: block; margin-top: 0; margin-bottom: 24px; margin-left: 0; margin-right: 0; border: 0; max-width: 129px; width: 100%; height: auto;">
                </a>
              </td>
            </tr>
            <tr style="padding-top: 8px; padding-bottom: 8px; padding-left: 0; padding-right: 0;">
                <td style="padding-top: 16px; padding-bottom: 8px; padding-left: 0; padding-right: 0;">
                    <h2 style="font-weight: 500; font-size: 14px; line-height: 100%; padding: 0; color: #231f20; margin: 0;">
                    Hi <span style="font-weight: 700;">${firstName}</span>
                    </h2>
                </td>
            </tr>
            <tr style="padding-top: 8px; padding-bottom: 24px; padding-left: 0; padding-right: 0;">
                <td>
                    <p style="font-weight: 450; font-size: 14px; line-height: 150%; color: #616161; margin: 0; padding-top: 8px; padding-bottom: 8px;">
                       A new Talent Hub inquiry has been received.
                    </p>
                </td>
            </tr>
            <tr>
              <td style="padding-top: 4px; padding-bottom: 24px; padding-left: 0; padding-right: 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="background-color: #F5F5F5;">
                    <td style="padding-top: 12px; padding-bottom: 12px; padding-left: 12px; padding-right: 12px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>                            
                            <h3 style="font-size: 14px; font-weight: 700; line-height: 150%; margin-top: 0; margin-bottom: 16px; margin-left: 0; margin-right: 0; padding: 0; color: #212121;">
                              ${validatedData.contactName} - ${validatedData.companyName}
                            </h3>
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0;">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 5px;">
                                    <img src="https://images.pepagora.com/pep-emailers/assets/img/email.png" alt="Email" width="18" style="display: block;">
                                    </td>
                                    <td style="vertical-align: middle; padding-left: 6px; font-size: 12px; font-weight: 600; color: #212121; line-height: 150%; padding: 0;">
                                        ${validatedData.email}
                                    </td>
                                </tr>
                            </table>
                            ${phoneDisplay !== 'Not provided' ? `
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding-top: 4px; padding-bottom: 16px;">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 5px;">
                                    <img src="https://images.pepagora.com/pep-emailers/assets/img/phone.png" alt="Phone" width="18" style="display: block;">
                                    </td>
                                    <td style="vertical-align: middle; padding-left: 6px; font-size: 12px; font-weight: 500; color: #212121; line-height: 150%; padding: 0;">
                                        ${phoneDisplay}
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                            <h3 style="font-size: 14px; font-weight: 600; line-height: 24px; color: #212121; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0;">
                              Roles Interested:
                            </h3>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 4px; margin-left: 0; margin-right: 0; padding: 0;">
                              ${validatedData.rolesInterested.join(', ')}
                            </p>
                            <h3 style="font-size: 14px; font-weight: 600; line-height: 24px; color: #212121; margin-top: 16px; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0;">
                              Hiring Challenge:
                            </h3>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 4px; margin-left: 0; margin-right: 0; padding: 0;">
                              ${validatedData.hiringChallenge}
                            </p>
                            <h3 style="font-size: 14px; font-weight: 600; line-height: 24px; color: #212121; margin-top: 16px; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0;">
                              Timeline:
                            </h3>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 4px; margin-left: 0; margin-right: 0; padding: 0;">
                              ${validatedData.timeline}
                            </p>
                            <h3 style="font-size: 14px; font-weight: 600; line-height: 24px; color: #212121; margin-top: 16px; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0;">
                              Co-branding Consent:
                            </h3>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 4px; margin-left: 0; margin-right: 0; padding: 0;">
                              ${validatedData.coBrandingConsent ? 'Yes' : 'No'}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
                <td style="padding-top: 0; padding-bottom: 16px; padding-left: 0; padding-right: 0;">
                    <h2 style="font-size: 14px; font-weight: 500; line-height: 20px; padding-top: 0; padding-bottom: 0; padding-left: 0; padding-right: 0; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; color: #616161;">
                      Please respond as early as possible and grow your business
                    </h2>
                </td>
            </tr>
            <tr>
              <td style="padding-top: 24px; padding-bottom: 40px; padding-left: 5px; padding-right: 5px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="top" style="padding: 0; vertical-align: top;">
                      <p style="font-size: 14px; font-weight: 700; line-height: 140%; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding-top: 4px; padding-bottom: 0; padding-left: 0; padding-right: 0;">
                        The Pepagora System.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" style="padding-top: 16px; padding-bottom: 0; padding-left: 0; padding-right: 0; vertical-align: top;">
                      <p style="font-size: 14px; font-weight: 400; line-height: 140%; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0;">
                        <a href="https://www.pepagora.com" target="_blank" rel="noopener noreferrer" style="color: #222; text-decoration: underline;">www.pepagora.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td valign="top" style="padding-top: 0px; padding-bottom: 0; padding-left: 0; padding-right: 0; vertical-align: top;">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-content" style="max-width: 600px; margin-top: 0; margin-bottom: 0; margin-left: auto; margin-right: auto; padding-top: 24px; padding-bottom: 0; padding-left: 0; padding-right: 0;">
                <tr>
                    <td style="font-size: 12px; font-weight: 300; line-height: 122%; color: #616161; padding: 0;">
                        <p style="margin-top: 0; margin-bottom: 8px; margin-left: 0; margin-right: 0; padding: 0; text-align: center;">
                        Follow us
                        </p>
                        </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                        <td style="padding: 0 8px;">
                            <a href="https://api.whatsapp.com/send?phone=+919500304116&text=Hello+Team!+I+am+interested+in+knowing+more+about+Pepagora+services." aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/whatsapp.png" alt="WhatsApp" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                             </a>
                            </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.facebook.com/pepagora" aria-label="Facebook" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Facebook.png" alt="Facebook" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                            </a>
                        </td>
                        <td style="padding: 0 8px;">
                            <a href="https://x.com/Pepagora" aria-label="X" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Twitter.png" alt="X" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                            </a>
                            </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.youtube.com/@pepagora" aria-label="YouTube" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/youtube.png" alt="YouTube" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                         </a>
                        </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.instagram.com/pepagora" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                        <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Instagram.png" alt="Instagram" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                        </a>
                        </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.linkedin.com/company/pepagora" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                        <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Linkedin.png" alt="LinkedIn" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                        </a>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-content" style="max-width: 600px; margin-top: 0; margin-bottom: 0; margin-left: auto; margin-right: auto; padding-top: 24px; padding-bottom: 0; padding-left: 0; padding-right: 0;">
            <tr>
              <td style="font-size: 10px; font-weight: 300; line-height: 122%; color: #616161; padding: 0;">
                <p style="margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0; text-align: center;">
                 Don't want to hear from us again? <br/> You can <a href="https://www.pepagora.com/en/s/contact-us" title="Unsubscribe" style="text-decoration: underline; color: #616161;">Unsubscribe</a> at any time or <a href="https://www.pepagora.com/en/s/contact-us" title="Update your preferences" style="color: #616161;">Update your preferences</a> <br/><br/> In case of any issues regarding Pepagora contact <a href="https://www.pepagora.com/en/s/contact-us" title="Help & Support" style="color: #616161;">Help & Support.</a>
                </p>
                <br />
                <p style="padding-top: 17px; padding-bottom: 0; padding-left: 0; padding-right: 0; font-size: 12px; font-weight: 400; line-height: 140%; color: #58595d; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; text-align: center;">
                  © 2025 Pepagora. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <style type="text/css">
      @media only screen and (max-width: 600px) {
        .email-wrapper { width: 100% !important; max-width: 100% !important; }
        .email-content { width: 100% !important; max-width: 95% !important; padding-left: 20px !important; padding-right: 20px !important; }
        .email-column { width: 100% !important; max-width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
        table td[class="email-column"] { width: 100% !important; display: block !important; padding-left: 0 !important; padding-right: 0 !important; }
        .btns-content { padding-left: 20px !important; padding-right: 20px !important; }
      }
      @media only screen and (max-width: 480px) {
        .email-content { padding-left: 15px !important; padding-right: 15px !important; }
      }
    </style>
  </body>
</html>`;

    const emailText = `
New Talent Hub Inquiry

Contact Information:
- Company Name: ${validatedData.companyName}
- Contact Name: ${validatedData.contactName}
- Email: ${validatedData.email}
- Phone: ${phoneDisplay}

Hiring Requirements:
- Roles Interested: ${validatedData.rolesInterested.join(', ')}
- Hiring Challenge: ${validatedData.hiringChallenge}
- Timeline: ${validatedData.timeline}
- Co-branding Consent: ${validatedData.coBrandingConsent ? 'Yes' : 'No'}

Submitted at: ${new Date().toLocaleString()}
    `;

    // Send email to the company
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: validatedData.email,
      subject: `New Talent Hub Inquiry from ${validatedData.companyName}`,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Talent Hub Inquiry Confirmation</title>
  </head>
  <body style="margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #222; background-color: #fff; line-height: 1.5; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="email-wrapper" style="background-color: #eeeeee; padding-top: 60px; padding-bottom: 60px; padding-left: 0; padding-right: 0; width: 100%; max-width: 1920px; margin: 0 auto; ">
      <tr>
        <td align="center" style="padding: 0;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-content" style="background-color: #ffffff; max-width: 600px; margin-top: 0; margin-bottom: 0; margin-left: auto; margin-right: auto; padding-top: 40px; padding-bottom: 40px; padding-left: 40px; padding-right: 40px; box-shadow: 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25); border-radius: 12px;">
            <tr>
              <td style="padding: 0;">
                <a href="https://www.pepagora.com/en?utm_source=email&utm_medium=drip&utm_campaign=talent_hub_confirmation" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none;">
                <img src="https://images.pepagora.com/pep-emailers/assets/img/logoPepagora.jpg" width="129" height="41" alt="Pepagora Logo" style="display: block; margin-top: 0; margin-bottom: 24px; margin-left: 0; margin-right: 0; border: 0; max-width: 129px; width: 100%; height: auto;">
                </a>
              </td>
            </tr>
            <tr style="padding-top: 8px; padding-bottom: 8px; padding-left: 0; padding-right: 0;">
                <td style="padding-top: 16px; padding-bottom: 8px; padding-left: 0; padding-right: 0;">
                    <h2 style="font-weight: 500; font-size: 14px; line-height: 100%; padding: 0; color: #231f20; margin: 0;">
                    Hi <span style="font-weight: 700;">${firstName}</span>
                    </h2>
                </td>
            </tr>
            <tr style="padding-top: 8px; padding-bottom: 24px; padding-left: 0; padding-right: 0;">
                <td>
                    <p style="font-weight: 450; font-size: 14px; line-height: 150%; color: #616161; margin: 0; padding-top: 8px; padding-bottom: 8px;">
                       Thank you for contacting Pepagora Talent Hub. We've received your inquiry and our team will get back to you within 24-48 hours.
                    </p>
                </td>
            </tr>
            <tr>
              <td style="padding-top: 4px; padding-bottom: 24px; padding-left: 0; padding-right: 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="background-color: #F5F5F5;">
                    <td style="padding-top: 12px; padding-bottom: 12px; padding-left: 12px; padding-right: 12px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <h3 style="font-size: 14px; font-weight: 600; line-height: 24px; color: #212121; margin-top: 0; margin-bottom: 12px; margin-left: 0; margin-right: 0; padding: 0;">
                              Summary of your inquiry
                            </h3>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 8px; margin-left: 0; margin-right: 0; padding: 0;">
                              <strong>Company:</strong> ${validatedData.companyName}
                            </p>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 8px; margin-left: 0; margin-right: 0; padding: 0;">
                              <strong>Roles Interested:</strong> ${validatedData.rolesInterested.join(', ')}
                            </p>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 8px; margin-left: 0; margin-right: 0; padding: 0;">
                              <strong>Hiring Challenge:</strong> ${validatedData.hiringChallenge}
                            </p>
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 8px; margin-left: 0; margin-right: 0; padding: 0;">
                              <strong>Timeline:</strong> ${validatedData.timeline}
                            </p>
                            ${phoneDisplay !== 'Not provided' ? `
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 8px; margin-left: 0; margin-right: 0; padding: 0;">
                              <strong>Phone:</strong> ${phoneDisplay}
                            </p>
                            ` : ''}
                            <p style="font-size: 14px; font-weight: 400; line-height: 150%; color: #616161; margin-top: 0; margin-bottom: 4px; margin-left: 0; margin-right: 0; padding: 0;">
                              <strong>Co-branding Consent:</strong> ${validatedData.coBrandingConsent ? 'Yes' : 'No'}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
                <td style="padding-top: 0; padding-bottom: 16px; padding-left: 0; padding-right: 0;">
                    <h2 style="font-size: 14px; font-weight: 500; line-height: 20px; padding-top: 0; padding-bottom: 0; padding-left: 0; padding-right: 0; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; color: #616161;">
                    We look forward to assisting you.
                    </h2>
                </td>
            </tr>
            <tr>
              <td style="padding-top: 24px; padding-bottom: 40px; padding-left: 5px; padding-right: 5px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="top" style="padding: 0; vertical-align: top;">
                      <p style="font-size: 14px; font-weight: 700; line-height: 140%; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0;">
                        Warmly, 
                      </p>
                      <p style="font-size: 14px; font-weight: 700; line-height: 140%; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding-top: 4px; padding-bottom: 0; padding-left: 0; padding-right: 0;">
                        The Pepagora Team
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" style="padding-top: 16px; padding-bottom: 0; padding-left: 0; padding-right: 0; vertical-align: top;">
                      <p style="font-size: 14px; font-weight: 400; line-height: 140%; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0;">
                        <a href="https://www.pepagora.com" target="_blank" rel="noopener noreferrer" style="color: #222; text-decoration: underline;">www.pepagora.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td valign="top" style="padding-top: 0px; padding-bottom: 0; padding-left: 0; padding-right: 0; vertical-align: top;">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-content" style="max-width: 600px; margin-top: 0; margin-bottom: 0; margin-left: auto; margin-right: auto; padding-top: 24px; padding-bottom: 0; padding-left: 0; padding-right: 0;">
                <tr>
                    <td style="font-size: 12px; font-weight: 300; line-height: 122%; color: #616161; padding: 0;">
                        <p style="margin-top: 0; margin-bottom: 8px; margin-left: 0; margin-right: 0; padding: 0; text-align: center;">
                        Follow us
                        </p>
                        </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                        <td style="padding: 0 8px;">
                            <a href="https://api.whatsapp.com/send?phone=+919500304116&text=Hello+Team!+I+am+interested+in+knowing+more+about+Pepagora+services." aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/whatsapp.png" alt="WhatsApp" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                             </a>
                            </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.facebook.com/pepagora" aria-label="Facebook" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Facebook.png" alt="Facebook" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                            </a>
                        </td>
                        <td style="padding: 0 8px;">
                            <a href="https://x.com/Pepagora" aria-label="X" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Twitter.png" alt="X" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                            </a>
                            </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.youtube.com/@pepagora" aria-label="YouTube" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                            <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/youtube.png" alt="YouTube" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                         </a>
                        </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.instagram.com/pepagora" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                        <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Instagram.png" alt="Instagram" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                        </a>
                        </td>
                        <td style="padding: 0 8px;">
                        <a href="https://www.linkedin.com/company/pepagora" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                        <img src="https://images.pepagora.com/pep-emailers/assets/Emiler_Icons/Linkedin.png" alt="LinkedIn" width="32" height="32" style="display: block; border: 0; max-width: 32px; width: 100%; height: auto;" />
                        </a>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-content" style="max-width: 600px; margin-top: 0; margin-bottom: 0; margin-left: auto; margin-right: auto; padding-top: 24px; padding-bottom: 0; padding-left: 0; padding-right: 0;">
            <tr>
              <td style="font-size: 10px; font-weight: 300; line-height: 122%; color: #616161; padding: 0;">
                <p style="margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; padding: 0; text-align: center;">
                 Don't want to hear from us again? <br/> You can <a href="https://www.pepagora.com/en/s/contact-us" title="Unsubscribe" style="text-decoration: underline; color: #616161;">Unsubscribe</a> at any time or <a href="https://www.pepagora.com/en/s/contact-us" title="Update your preferences" style="color: #616161;">Update your preferences</a> <br/><br/> In case of any issues regarding Pepagora contact <a href="https://www.pepagora.com/en/s/contact-us" title="Help & Support" style="color: #616161;">Help & Support.</a>
                </p>
                <br />
                <p style="padding-top: 17px; padding-bottom: 0; padding-left: 0; padding-right: 0; font-size: 12px; font-weight: 400; line-height: 140%; color: #58595d; margin-top: 0; margin-bottom: 0; margin-left: 0; margin-right: 0; text-align: center;">
                  © 2025 Pepagora. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <style type="text/css">
      @media only screen and (max-width: 600px) {
        .email-wrapper { width: 100% !important; max-width: 100% !important; }
        .email-content { width: 100% !important; max-width: 95% !important; padding-left: 20px !important; padding-right: 20px !important; }
        .email-column { width: 100% !important; max-width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
        table td[class="email-column"] { width: 100% !important; display: block !important; padding-left: 0 !important; padding-right: 0 !important; }
        .btns-content { padding-left: 20px !important; padding-right: 20px !important; }
      }
      @media only screen and (max-width: 480px) {
        .email-content { padding-left: 15px !important; padding-right: 15px !important; }
      }
    </style>
  </body>
</html>`;

    const confirmationText = `
Thank You for Your Inquiry!

Dear ${validatedData.contactName},

Thank you for submitting your talent inquiry. We have received your request and our team will review it shortly.

What happens next?
- Our team will review your requirements within 24-48 hours
- We'll contact you at ${validatedData.email} to discuss your hiring needs
- We'll provide a customized solution based on your requirements

If you have any urgent questions, please feel free to contact us at support@pepagora.com

Best regards,
The Pepagora Talent Hub Team
    `;

    const confirmationMailOptions = {
      from: `"Talent Hub" <${process.env.SMTP_USER || 'no-reply@pepagora.info'}>`,
      to: validatedData.email,
      subject: 'Thank You for Your Talent Hub Inquiry',
      text: confirmationText,
      html: confirmationHtml,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully. A confirmation email has been sent to your email address.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit inquiry. Please try again or contact support@pepagora.com' 
      },
      { status: 500 }
    );
  }
}

