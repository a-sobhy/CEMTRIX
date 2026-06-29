// website/src/app/api/contact/dto/contact.dto.ts
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";

export class ContactDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(200, { message: 'Name must be less than 200 characters' })
    name!: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @IsString()
    @IsOptional()
    @MaxLength(200, { message: 'Company name must be less than 200 characters' })
    company?: string;

    @IsString()
    @IsOptional()
    @MaxLength(5000, { message: 'Message must be less than 5000 characters' })
    message?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50, { message: 'Preferred time must be less than 50 characters' })
    preferredTime?: string;
}