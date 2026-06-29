import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ContactDto } from './contact.dto';

/**
 * "Contact us about <service>" form.
 * Frontend payload: { name, email, company, message, service }
 */
export class ContactServiceDto extends ContactDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    service!: string;
}