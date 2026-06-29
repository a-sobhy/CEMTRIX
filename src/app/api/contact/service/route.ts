// website/src/app/api/contact/service/route.ts
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextRequest, NextResponse } from 'next/server';
import 'reflect-metadata';
import { MailService } from '../../mail/mail.service';
import { ContactService } from '../contact.service';
import { ContactServiceDto } from '../dto/contact-service.dto';

// Define custom error type without using 'any'
interface ServiceError extends Error {
    status?: number;
    statusCode?: number;
    response?: {
        status: number;
        data: unknown; // Use 'unknown' instead of 'any'
    };
    errors?: Record<string, string[]>; // For validation errors
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Transform and validate using class-validator
        const dto = plainToClass(ContactServiceDto, body);
        const errors = await validate(dto);

        if (errors.length > 0) {
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

        // Process the service enquiry
        const result = await contactService.handleServiceContact(dto);

        // Return response matching frontend expectation
        return NextResponse.json({
            id: result.id,
            status: 'received'
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Service enquiry error:', error);

        // Type guard to check if error has status property
        const serviceError = error as ServiceError;

        // Handle ServiceUnavailableException (503)
        if (serviceError.status === 503) {
            return NextResponse.json({
                success: false,
                message: serviceError.message || 'Could not send your enquiry right now. Please try again later.',
                statusCode: 503
            }, { status: 503 });
        }

        // Handle validation errors or other known errors
        const statusCode = serviceError.status || serviceError.statusCode || 500;
        const message = serviceError.message || 'Failed to submit service enquiry';

        return NextResponse.json({
            success: false,
            message: message,
            statusCode: statusCode,
            errors: serviceError.errors // Include validation errors if present
        }, { status: statusCode });
    }
}