// website/src/app/api/contact/route.ts
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextRequest, NextResponse } from 'next/server';
import 'reflect-metadata';
import { MailService } from '../mail/mail.service';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

// Define custom error type without using 'any'
interface ServiceError extends Error {
    status?: number;
    statusCode?: number;
    response?: {
        status: number;
        data: unknown;
    };
    errors?: Record<string, string[]>;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Received contact request:', body);

        // Transform and validate using class-validator
        const dto = plainToClass(ContactDto, body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            console.log('Validation errors:', errors);
            return NextResponse.json({
                success: false,
                message: 'Validation failed',
                errors: errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }))
            }, { status: 400 });
        }

        // Initialize services
        const mailService = new MailService();
        const contactService = new ContactService(mailService);

        // Process the contact
        const result = await contactService.handleContact(dto);

        // Return response matching frontend expectation
        return NextResponse.json({
            id: result.id,
            status: 'received'
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Contact form error:', error);

        // Type guard to check if error has status property
        const serviceError = error as ServiceError;

        // Handle ServiceUnavailableException (503)
        if (serviceError.status === 503) {
            return NextResponse.json({
                success: false,
                message: serviceError.message || 'Could not send your message right now. Please try again later.',
                statusCode: 503
            }, { status: 503 });
        }

        const statusCode = serviceError.status || serviceError.statusCode || 500;
        const message = serviceError.message || 'Failed to submit contact form';

        return NextResponse.json({
            success: false,
            message: message,
            statusCode: statusCode,
            errors: serviceError.errors
        }, { status: statusCode });
    }
}