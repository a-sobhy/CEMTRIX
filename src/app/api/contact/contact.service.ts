// website/src/app/api/contact/contact.service.ts
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { ContactServiceDto } from './dto/contact-service.dto';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name);

    constructor(private readonly mail: MailService) { }

    /** Handles the general "Contact us" form. */
    async handleContact(dto: ContactDto): Promise<{ id: string; status: string }> {
        const id = this.generateId();

        this.logger.log(`Processing contact from ${dto.name} (${dto.email})`);

        await this.deliver({
            subject: `New contact enquiry from ${dto.name}`,
            replyTo: dto.email,
            text: this.buildText(dto),
            html: this.buildHtml('New contact enquiry', dto),
        });

        return { id, status: 'received' };
    }

    /** Handles the "Contact us about <service>" form. */
    async handleServiceContact(dto: ContactServiceDto): Promise<{ id: string; status: string }> {
        const id = this.generateId();

        this.logger.log(`Processing service enquiry from ${dto.name} (${dto.email}) about ${dto.service}`);

        await this.deliver({
            subject: `New enquiry about "${dto.service}" from ${dto.name}`,
            replyTo: dto.email,
            text: this.buildTextWithService(dto, dto.service),
            html: this.buildHtmlWithService(`New enquiry about "${dto.service}"`, dto, dto.service),
        });

        return { id, status: 'received' };
    }

    private async deliver(input: Parameters<MailService['send']>[0]): Promise<void> {
        try {
            await this.mail.send(input);
            this.logger.log('Email sent successfully');
        } catch (err) {
            // Mail provider failure (e.g. bad SMTP credentials) — log the real cause and
            // return a clear 503 instead of a generic "Internal server error".
            this.logger.error(`Failed to send contact email: ${(err as Error).message}`);
            throw new ServiceUnavailableException(
                'Could not send your message right now. Please try again later.',
            );
        }
    }

    private buildText(dto: ContactDto): string {
        const lines = [
            `Name: ${dto.name}`,
            `Email: ${dto.email}`,
            `Company: ${dto.company || '-'}`,
            dto.preferredTime ? `Preferred Time: ${dto.preferredTime}` : null,
            '',
            'Message:',
            dto.message || 'No message provided',
        ].filter((l) => l !== null);

        return lines.join('\n');
    }

    private buildTextWithService(dto: ContactServiceDto, service: string): string {
        const lines = [
            `Service: ${service}`,
            `Name: ${dto.name}`,
            `Email: ${dto.email}`,
            `Company: ${dto.company || '-'}`,
            '',
            'Message:',
            dto.message || 'No message provided',
        ].filter((l) => l !== null);

        return lines.join('\n');
    }

    private buildHtml(heading: string, dto: ContactDto): string {
        const row = (label: string, value: string) =>
            `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${label}</td><td style="padding:4px 0">${this.escape(value)}</td></tr>`;

        return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a365d; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f7fafc; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2d3748; }
            .value { color: #4a5568; }
            .footer { text-align: center; padding: 20px; color: #718096; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${this.escape(heading)}</h2>
            </div>
            <div class="content">
              <table style="width:100%;border-collapse:collapse">
                ${row('Name', dto.name)}
                ${row('Email', dto.email)}
                ${row('Company', dto.company || '-')}
                ${dto.preferredTime ? row('Preferred Time', dto.preferredTime) : ''}
              </table>
              <h3 style="margin:16px 0 8px">Message</h3>
              <p style="white-space:pre-wrap;margin:0;background:#fff;padding:10px;border-radius:4px;">${this.escape(dto.message || 'No message provided')}</p>
              <hr style="margin:20px 0">
              <p style="color:#718096;font-size:12px;">Submitted at: ${new Date().toLocaleString()}</p>
            </div>
            <div class="footer">
              <p>This email was sent from the Cemtrix contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    }

    private buildHtmlWithService(heading: string, dto: ContactServiceDto, service: string): string {
        const row = (label: string, value: string) =>
            `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${label}</td><td style="padding:4px 0">${this.escape(value)}</td></tr>`;

        return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a365d; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f7fafc; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2d3748; }
            .value { color: #4a5568; }
            .footer { text-align: center; padding: 20px; color: #718096; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${this.escape(heading)}</h2>
            </div>
            <div class="content">
              <table style="width:100%;border-collapse:collapse">
                ${row('Service', service)}
                ${row('Name', dto.name)}
                ${row('Email', dto.email)}
                ${row('Company', dto.company || '-')}
              </table>
              <h3 style="margin:16px 0 8px">Message</h3>
              <p style="white-space:pre-wrap;margin:0;background:#fff;padding:10px;border-radius:4px;">${this.escape(dto.message || 'No message provided')}</p>
              <hr style="margin:20px 0">
              <p style="color:#718096;font-size:12px;">Submitted at: ${new Date().toLocaleString()}</p>
            </div>
            <div class="footer">
              <p>This email was sent from the Cemtrix service enquiry form.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    }

    private escape(value: string): string {
        if (!value) return '';
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    private generateId(): string {
        return `cont_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}