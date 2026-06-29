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
        // Check if we have the required environment variables
        const hasRequiredVars = process.env.MAIL_USER && process.env.MAIL_PASS;

        if (!hasRequiredVars) {
            this.logger.warn('SMTP credentials not configured. Email sending will be simulated.');

            // In development, create a mock transporter that logs instead of sending
            if (process.env.NODE_ENV === 'development') {
                this.transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'ethereal.user@ethereal.email',
                        pass: 'ethereal.password'
                    }
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
            // Get the recipient email from environment or use a default
            const toEmail = process.env.MAIL_TO || 'info@cemtrixai.com';

            // Parse the FROM field to extract email
            const fromEmail = this.extractEmailFromFrom(process.env.MAIL_FROM || 'noreply@cemtrixai.com');

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

            // In development, log the email instead of sending if no credentials
            if (process.env.NODE_ENV === 'development' && !process.env.MAIL_USER) {
                this.logger.log('Development mode - Email would be sent:');
                this.logger.log(`Text: ${options.text.substring(0, 200)}...`);
                return;
            }

            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent: ${info.messageId}`);

            // Send auto-reply to the user
            await this.sendAutoReply(options.replyTo);
        } catch (error) {
            this.logger.error(`Failed to send email: ${(error as Error).message}`);
            this.logger.error(`Error details: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    private extractEmailFromFrom(fromString: string): string {
        // Extract email from "Name <email@domain.com>" format
        const match = fromString.match(/<([^>]+)>/);
        return match ? match[1] : fromString;
    }

    private async sendAutoReply(to: string): Promise<void> {
        try {
            const mailOptions = {
                from: process.env.MAIL_FROM || 'noreply@cemtrixai.com',
                to: to,
                subject: 'Thank you for contacting Cemtrix',
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
            // Don't throw for auto-reply failures
        }
    }

    private getAutoReplyText(): string {
        return `
Thank You for Contacting Cemtrix!

We have received your message and our team will get back to you within 24 hours.

In the meantime, feel free to visit our website: cemtrixai.com

Best regards,
The Cemtrix Team

This is an automated response. Please do not reply to this email.
    `;
    }

    private getAutoReplyHtml(): string {
        return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a365d; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f7fafc; }
            .footer { text-align: center; padding: 20px; color: #718096; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cemtrixai.com/assets/logo.png" alt="Cemtrix Logo">
              <h1>Thank You for Contacting Cemtrix!</h1>
            </div>
            <div class="content">
              <p>Dear valued customer,</p>
              <p>We have received your message and our team will get back to you within 24 hours.</p>
              <p>In the meantime, feel free to:</p>
              <ul>
                <li>Visit our website: <a href="https://cemtrixai.com">cemtrixai.com</a></li>
                <li>Check out our products: <a href="https://cemtrixai.com/#products">Products</a></li>
                <li>Read our case studies: <a href="https://cemtrixai.com/#case-studies">Case Studies</a></li>
                <li>Learn more about us: <a href="https://cemtrixai.com/about">About Us</a></li>
              </ul>
              <p>Best regards,</p>
              <p><strong>The Cemtrix Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    }
}