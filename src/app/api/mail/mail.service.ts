// website/src/app/api/mail/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface MailOptions {
    subject: string;
    replyTo: string;
    text: string;
    html: string;
}

@Injectable()
export class MailService {
    private transporter!: nodemailer.Transporter;
    private readonly logger = new Logger(MailService.name);

    constructor() {
        this.initializeTransporter();
    }

    private initializeTransporter() {
        const hasRequiredVars = process.env.MAIL_USER && process.env.MAIL_PASS;

        if (!hasRequiredVars) {
            this.logger.warn('SMTP credentials not configured. Email sending will be simulated.');
            if (process.env.NODE_ENV === 'development') {
                this.transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'ethereal.user@ethereal.email',
                        pass: 'ethereal.password',
                    },
                });
                return;
            }
        }

        this.logger.log(`Configuring SMTP with host: ${process.env.MAIL_HOST}`);
        this.logger.log(`Using email: ${process.env.MAIL_USER}`);

        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.MAIL_PORT || '587'),
            secure: process.env.MAIL_SECURE === 'true',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async send(options: MailOptions): Promise<void> {
        try {
            const toEmail = process.env.MAIL_TO || 'info@cemtrixai.com';

            const mailOptions = {
                from: process.env.MAIL_FROM || 'noreply@cemtrixai.com',
                to: toEmail,
                replyTo: options.replyTo,
                subject: options.subject,
                text: options.text,
                html: options.html,
            };

            this.logger.log(`Sending email to: ${toEmail}`);
            this.logger.log(`From: ${mailOptions.from}`);
            this.logger.log(`Subject: ${mailOptions.subject}`);
            this.logger.log(`ReplyTo: ${options.replyTo}`);

            if (process.env.NODE_ENV === 'development' && !process.env.MAIL_USER) {
                this.logger.log('Development mode - Email would be sent:');
                this.logger.log(`Text: ${options.text.substring(0, 200)}...`);
                return;
            }

            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent: ${info.messageId}`);

            await this.sendAutoReply(options.replyTo);
        } catch (error) {
            this.logger.error(`Failed to send email: ${(error as Error).message}`);
            this.logger.error(`Error details: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    private async sendAutoReply(to: string): Promise<void> {
        try {
            const mailOptions = {
                from: process.env.MAIL_FROM || 'noreply@cemtrixai.com',
                to: to,
                subject: 'Thank You for Contacting CEMTRIX!',
                text: this.getAutoReplyText(),
                html: this.getAutoReplyHtml(),
            };

            if (process.env.NODE_ENV === 'development' && !process.env.MAIL_USER) {
                this.logger.log('Development mode - Auto-reply would be sent to:', to);
                return;
            }

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Auto-reply sent to: ${to}`);
        } catch (error) {
            this.logger.error(`Auto-reply failed: ${(error as Error).message}`);
        }
    }

    private getAutoReplyText(): string {
        return `
Thank You for Contacting CEMTRIX!
AI-Powered Intelligence for Cement Operations

Dear Valued Customer,

Thank you for your interest in CEMTRIX.

We have successfully received your inquiry. A member of our team will review your request and contact you within one business day.

At CEMTRIX, we help cement manufacturers unlock the power of Artificial Intelligence.

OUR SOLUTIONS:

* SMARTCEM - AI-Powered Learning Intelligence
  Develop a skilled workforce with personalized learning and knowledge at scale.

* CEMTRIX Intelligence - Real-Time Plant Intelligence
  Gain full visibility across operations and make faster, smarter decisions.

* Condition Intelligence - Predictive Maintenance & Asset Reliability
  Predict issues, reduce downtime and extend asset life with AI.

WHILE YOU WAIT, EXPLORE CEMTRIX:
- Visit our Website: https://cemtrixai.com
- Explore our AI Solutions: https://cemtrixai.com/#products
- View Customer Case Studies: https://cemtrixai.com/#case-studies

WHAT HAPPENS NEXT?
1. Your inquiry has been received and assigned to our team.
2. We will review your requirements and understand your goals.
3. One of our specialists will contact you to discuss how CEMTRIX can help.
4. Together, we will identify the best solution for your operation.

Thank you for considering CEMTRIX.
We look forward to helping your organization build a smarter workforce,
optimize plant performance, and accelerate operational excellence through AI.

The CEMTRIX Team

---
www.cemtrixai.com | info@cemtrixai.com
        `.trim();
    }

    // ─── Email-safe icon helpers ──────────────────────────────────────────────
    // Strategy: <img> tags pointing to publicly hosted PNG icons (32x32 or 28x28).
    // Fallback text symbol shown when images are blocked.
    // Base URL for hosted icon PNGs — place these in your public/assets/icons/ folder.

    private readonly ICON_BASE = 'https://cemtrixai.com/assets/mail-icons';

    /**
     * Renders an email-safe icon using a hosted PNG image.
     * Falls back gracefully when images are blocked.
     *
     * @param name     - filename without extension (e.g. 'graduation-cap')
     * @param alt      - alt text / emoji fallback visible when images blocked
     * @param size     - pixel size for width & height attributes
     * @param bgColor  - background circle colour
     */
    private iconImg(
        name: string,
        alt: string,
        size: number,
        bgColor: string,
    ): string {
        return `<img
          src="${this.ICON_BASE}/${name}.png"
          alt="${alt}"
          width="${size}"
          height="${size}"
          style="display:block;border:0;outline:none;
                 -ms-interpolation-mode:bicubic;"
        />`;
    }

    /**
     * Returns a coloured circle table-cell containing a hosted PNG icon.
     * @param name     - icon filename without extension
     * @param alt      - descriptive alt text
     * @param iconSize - rendered icon size in px (image width/height)
     * @param cellSize - outer circle diameter in px
     * @param bgColor  - circle background colour
     */
    private iconCircle(
        name: string,
        alt: string,
        iconSize: number,
        cellSize: number,
        bgColor: string,
    ): string {
        const pad = Math.round((cellSize - iconSize) / 2);
        return `
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="${cellSize}" height="${cellSize}"
              style="background-color:${bgColor};
                     border-radius:50%;
                     text-align:center;
                     vertical-align:middle;
                     width:${cellSize}px;
                     height:${cellSize}px;
                     padding:${pad}px;">
            <img src="${this.ICON_BASE}/${name}.png"
                 alt="${alt}"
                 width="${iconSize}"
                 height="${iconSize}"
                 style="display:block;
                        border:0;
                        outline:none;
                        margin:0 auto;
                        -ms-interpolation-mode:bicubic;"/>
          </td>
        </tr>
      </table>`.trim();
    }

    // ─────────────────────────────────────────────────────────────────────────

    private getAutoReplyHtml(): string {
        // Pre-render all icon circles
        // Icons needed (white, on coloured circles):
        const icnGraduationCap = this.iconCircle('graduation-cap-white', 'Learning', 24, 30, '#7c3aed');
        const icnBarChart = this.iconCircle('bar-chart-white', 'Analytics', 24, 30, '#3b5bdb');
        const icnSettings = this.iconCircle('settings-white', 'Maintenance', 24, 30, '#0d9488');

        // "While you wait" — coloured icons on light background
        const icnGlobe = this.iconCircle('globe-blue', 'Website', 24, 30, '#eff6ff');
        const icnPackage = this.iconCircle('package-purple', 'AI Solutions', 24, 30, '#f5f3ff');
        const icnFileText = this.iconCircle('file-text-teal', 'Case Studies', 24, 30, '#f0fdfa');

        // "What happens next" steps — coloured icons on tinted circles
        const icnMail = this.iconCircle('mail-blue', 'Inquiry received', 24, 40, '#e0e7ff');
        const icnSearch = this.iconCircle('search-purple', 'Review', 24, 40, '#ede9fe');
        const icnUsers = this.iconCircle('users-teal', 'Specialist contact', 24, 40, '#ccfbf1');
        const icnCheck = this.iconCircle('check-blue', 'Solution identified', 24, 40, '#dbeafe');

        // Footer tiny icons (inline with text)
        const icnGlobeFooter = `<img src="${this.ICON_BASE}/globe-light.png" alt="" width="14" height="14" style="display:inline-block;vertical-align:middle;border:0;margin-right:4px;"/>`;
        const icnMailFooter = `<img src="${this.ICON_BASE}/mail-light.png"  alt="" width="14" height="14" style="display:inline-block;vertical-align:middle;border:0;margin-right:4px;"/>`;

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Thank You for Contacting CEMTRIX</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6fa;
             font-family:Arial,Helvetica,sans-serif;">

<!-- ═══════════════════════════════════════════════
     OUTER WRAPPER
═══════════════════════════════════════════════ -->
<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:#f4f6fa;padding:20px 0;">
  <tr>
    <td align="center">

      <!-- ── CARD ── -->
      <table width="750" cellpadding="0" cellspacing="0" border="0"
             style="max-width:750px;width:100%;background:#ffffff;
                    border-radius:10px;overflow:hidden;
                    box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- ════════════════ HEADER ════════════════ -->
        <tr>
          <td style="background-color:#0f2347;padding:40px 30px 50px;
                     text-align:center;">
            <!--
              Gradient via a 1px tall spacer + solid fallback.
              True CSS gradients on <td> background are stripped by Gmail;
              use a hosted gradient image for perfect fidelity, or accept
              the solid-colour fallback shown here.
            -->
            <img src="https://cemtrixai.com/assets/logo.png"
                 alt="CEMTRIX" width="240"
                 style="display:inline-block;max-width:240px;
                        height:auto;margin-bottom:20px;border:0;"/>
            <p style="margin:0 0 12px;color:#ffffff;font-size:28px;
                      font-weight:900;line-height:1.2;">
              Thank You for Contacting
              <span style="color:#60a5fa;">CEMTRIX!</span>
            </p>
            <p style="margin:0;color:#cbd5e1;font-size:16px;font-weight:300;">
              AI-Powered Intelligence for Cement Operations
            </p>
          </td>
        </tr>

        <!-- ── GRADIENT DIVIDER (3 px image trick) ── -->
        <tr>
          <td height="3" style="font-size:0;line-height:0;padding:0;">
            <!--
              A 3-pixel-tall hosted PNG that shows the gradient.
              Falls back to a solid blue border on clients that block images.
            -->
            <img src="https://cemtrixai.com/assets/gradient-divider.png"
                 alt="" width="750" height="3"
                 style="display:block;width:100%;border:0;
                        border-top:3px solid #3b5bdb;"/>
          </td>
        </tr>

        <!-- ════════════════ GREETING ════════════════ -->
        <tr>
          <td style="padding:40px 30px 10px;">
            <p style="margin:0 0 16px;font-size:20px;color:#1a202c;
                      font-weight:700;">
              Dear Valued Customer,
            </p>
            <p style="margin:0 0 10px;font-size:15px;line-height:1.6;
                      color:#2d3748;">
              Thank you for your interest in
              <strong style="color:#3b5bdb;">CEMTRIX!</strong>
            </p>
            <p style="margin:0;font-size:15px;line-height:1.6;color:#2d3748;">
              We have successfully received your inquiry. A member of our team
              will review your request and contact you within
              <strong style="color:#3b5bdb;">one business day</strong>.
            </p>
          </td>
        </tr>

        <!-- ── INTRO LINE ── -->
        <tr>
          <td style="padding:20px 30px;text-align:center;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#2d3748;">
              At <span style="color:#3b5bdb;">CEMTRIX!</span>, we help cement
              manufacturers unlock the power of Artificial Intelligence.
            </p>
          </td>
        </tr>

        <!-- ════════════════ SOLUTIONS ════════════════ -->
        <tr>
          <td style="padding:0 20px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="background-color:#f7f9fc;border-radius:10px;">
              <tr>

                <!-- SMARTCEM -->
                <td width="33%" valign="top"
                    style="padding:16px 12px;
                           border-right:1px solid #dfdfdf;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="top" style="padding-right:12px;">
                        ${icnGraduationCap}
                      </td>
                      <td valign="top">
                        <p style="margin:0 0 2px;font-size:15px;font-weight:700;
                                  color:#7c3aed;">SMARTCEM</p>
                        <p style="margin:0 0 6px;font-size:12px;font-weight:600;
                                  color:#1a202c;line-height:1.3;">
                          AI-Powered Learning Intelligence
                        </p>
                        <p style="margin:0;font-size:12px;color:#4a5568;
                                  line-height:1.5;">
                          Develop a skilled workforce with personalized learning
                          and knowledge at scale.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- CEMTRIX Intelligence -->
                <td width="33%" valign="top"
                    style="padding:16px 12px;
                           border-right:1px solid #dfdfdf;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="top" style="padding-right:12px;">
                        ${icnBarChart}
                      </td>
                      <td valign="top">
                        <p style="margin:0 0 2px;font-size:15px;font-weight:700;
                                  color:#3b5bdb;">CEMTRIX Intelligence</p>
                        <p style="margin:0 0 6px;font-size:12px;font-weight:600;
                                  color:#1a202c;line-height:1.3;">
                          Real-Time Plant Intelligence
                        </p>
                        <p style="margin:0;font-size:12px;color:#4a5568;
                                  line-height:1.5;">
                          Gain full visibility across operations and make faster,
                          smarter decisions.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Condition Intelligence -->
                <td width="34%" valign="top" style="padding:16px 12px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="top" style="padding-right:12px;">
                        ${icnSettings}
                      </td>
                      <td valign="top">
                        <p style="margin:0 0 2px;font-size:15px;font-weight:700;
                                  color:#0d9488;">Condition Intelligence</p>
                        <p style="margin:0 0 6px;font-size:12px;font-weight:600;
                                  color:#1a202c;line-height:1.3;">
                          Predictive Maintenance &amp; Asset Reliability
                        </p>
                        <p style="margin:0;font-size:12px;color:#4a5568;
                                  line-height:1.5;">
                          Predict issues, reduce downtime and extend asset life
                          with AI.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>

              </tr>
            </table>
          </td>
        </tr>

        <!-- ════════════════ WHILE YOU WAIT ════════════════ -->
        <tr>
          <td style="padding:10px 30px 24px;text-align:center;">

            <!-- section title -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="margin-bottom:20px;">
              <tr>
                <td style="border-bottom:1px solid #cbd5e1;">&nbsp;</td>
                <td style="padding:0 16px;white-space:nowrap;font-size:18px;
                           font-weight:900;color:#1a202c;">
                  While You Wait, Explore CEMTRIX
                </td>
                <td style="border-bottom:1px solid #cbd5e1;">&nbsp;</td>
              </tr>
            </table>

            <!-- link grid -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>

                <!-- Website -->
                <td width="33%" style="text-align:center;padding:10px 5px;
                                       border-right:1px solid #dfdfdf;">
                  <a href="https://cemtrixai.com"
                     style="text-decoration:none;color:inherit;display:block;">
                    <table cellpadding="0" cellspacing="0" border="0"
                           align="center" style="margin:0 auto 10px;">
                      <tr><td>${icnGlobe}</td></tr>
                    </table>
                    <p style="margin:0;font-size:13px;color:#1a202c;">
                      Visit our
                    </p>
                    <p style="margin:0;font-size:13px;font-weight:900;
                              color:#3b5bdb;">Website</p>
                  </a>
                </td>

                <!-- AI Solutions -->
                <td width="33%" style="text-align:center;padding:10px 5px;
                                       border-right:1px solid #dfdfdf;">
                  <a href="https://cemtrixai.com/#products"
                     style="text-decoration:none;color:inherit;display:block;">
                    <table cellpadding="0" cellspacing="0" border="0"
                           align="center" style="margin:0 auto 10px;">
                      <tr><td>${icnPackage}</td></tr>
                    </table>
                    <p style="margin:0;font-size:13px;color:#1a202c;">
                      Explore our
                    </p>
                    <p style="margin:0;font-size:13px;font-weight:900;
                              color:#7c3aed;">AI Solutions</p>
                  </a>
                </td>

                <!-- Case Studies -->
                <td width="34%" style="text-align:center;padding:10px 5px;">
                  <a href="https://cemtrixai.com/#case-studies"
                     style="text-decoration:none;color:inherit;display:block;">
                    <table cellpadding="0" cellspacing="0" border="0"
                           align="center" style="margin:0 auto 10px;">
                      <tr><td>${icnFileText}</td></tr>
                    </table>
                    <p style="margin:0;font-size:13px;color:#1a202c;">
                      View Customer
                    </p>
                    <p style="margin:0;font-size:13px;font-weight:900;
                              color:#0d9488;">Case Studies</p>
                  </a>
                </td>

              </tr>
            </table>
          </td>
        </tr>

        <!-- ════════════════ WHAT HAPPENS NEXT ════════════════ -->
        <tr>
          <td style="padding:0 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="background-color:#f7f9fc;border-radius:10px;
                          padding:24px;">
              <tr>
                <td>
                  <p style="margin:0 0 24px;font-size:18px;font-weight:900;
                             color:#1a202c;">What Happens Next?</p>

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>

                      <!-- Step 1 -->
                      <td width="22%" valign="top"
                          style="text-align:center;padding:5px;">
                        <table cellpadding="0" cellspacing="0" border="0"
                               align="center">
                          <tr><td>${icnMail}</td></tr>
                        </table>
                        <p style="margin:12px 0 0;font-size:12px;color:#2d3748;
                                  line-height:1.5;">
                          Your inquiry has been received and assigned to our team.
                        </p>
                      </td>

                      <!-- Arrow -->
                      <td width="4%" style="text-align:center;font-size:20px;
                                            color:#94a3b8;vertical-align:middle;">
                        &#8594;
                      </td>

                      <!-- Step 2 -->
                      <td width="22%" valign="top"
                          style="text-align:center;padding:5px;">
                        <table cellpadding="0" cellspacing="0" border="0"
                               align="center">
                          <tr><td>${icnSearch}</td></tr>
                        </table>
                        <p style="margin:12px 0 0;font-size:12px;color:#2d3748;
                                  line-height:1.5;">
                          We will review your requirements and understand your
                          goals.
                        </p>
                      </td>

                      <!-- Arrow -->
                      <td width="4%" style="text-align:center;font-size:20px;
                                            color:#94a3b8;vertical-align:middle;">
                        &#8594;
                      </td>

                      <!-- Step 3 -->
                      <td width="22%" valign="top"
                          style="text-align:center;padding:5px;">
                        <table cellpadding="0" cellspacing="0" border="0"
                               align="center">
                          <tr><td>${icnUsers}</td></tr>
                        </table>
                        <p style="margin:12px 0 0;font-size:12px;color:#2d3748;
                                  line-height:1.5;">
                          One of our specialists will contact you to discuss how
                          CEMTRIX can help.
                        </p>
                      </td>

                      <!-- Arrow -->
                      <td width="4%" style="text-align:center;font-size:20px;
                                            color:#94a3b8;vertical-align:middle;">
                        &#8594;
                      </td>

                      <!-- Step 4 -->
                      <td width="22%" valign="top"
                          style="text-align:center;padding:5px;">
                        <table cellpadding="0" cellspacing="0" border="0"
                               align="center">
                          <tr><td>${icnCheck}</td></tr>
                        </table>
                        <p style="margin:12px 0 0;font-size:12px;color:#2d3748;
                                  line-height:1.5;">
                          Together, we will identify the best solution for your
                          operation.
                        </p>
                      </td>

                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ════════════════ CLOSING ════════════════ -->
        <tr>
          <td style="padding:10px 40px 40px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- avatar -->
                <td width="70" valign="top" style="padding-right:16px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="70" height="70"
                          style="background-color:#0a1733;
                                 border-radius:50%;
                                 text-align:center;
                                 vertical-align:middle;
                                 width:70px;height:70px;">
                        <img src="https://cemtrixai.com/assets/icon.png"
                             alt="CEMTRIX" width="40" height="40"
                             style="display:block;margin:15px auto;border:0;"/>
                      </td>
                    </tr>
                  </table>
                </td>
                <!-- text -->
                <td valign="top">
                  <p style="margin:0 0 8px;font-size:15px;color:#1a202c;">
                    Thank you for considering
                    <strong style="color:#3b5bdb;">CEMTRIX</strong>.
                  </p>
                  <p style="margin:0 0 12px;font-size:14px;color:#4a5568;
                             line-height:1.6;">
                    We look forward to helping your organization build a smarter
                    workforce, optimize plant performance, and accelerate
                    operational excellence through AI.
                  </p>
                  <p style="margin:0;font-size:15px;color:#3b5bdb;
                             font-weight:900;">
                    The CEMTRIX Team
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ════════════════ FOOTER ════════════════ -->
        <tr>
          <td style="background-color:#0a1733;padding:20px 40px;
                     text-align:center;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="text-align:center;">

                  <!-- Website link -->
                  <span style="display:inline-block;margin:0 12px;
                               color:#cbd5e1;font-size:12px;">
                    ${icnGlobeFooter}
                    <a href="https://www.cemtrixai.com"
                       style="color:#cbd5e1;text-decoration:none;
                              vertical-align:middle;">
                      www.cemtrixai.com
                    </a>
                  </span>

                  <!-- Separator -->
                  <span style="color:#cbd5e1;font-size:12px;">|</span>

                  <!-- Email link -->
                  <span style="display:inline-block;margin:0 12px;
                               color:#cbd5e1;font-size:12px;">
                    ${icnMailFooter}
                    <a href="mailto:info@cemtrixai.com"
                       style="color:#cbd5e1;text-decoration:none;
                              vertical-align:middle;">
                      info@cemtrixai.com
                    </a>
                  </span>

                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- /CARD -->

    </td>
  </tr>
</table>

</body>
</html>`;
    }
}