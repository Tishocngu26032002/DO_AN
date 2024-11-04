import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform<string, boolean> {
    transform(value: string): boolean {
        if (value === 'true') return true;
        if (value === 'false') return false;
        throw new BadRequestException(`Validation failed: ${value} is not a boolean`);
    }
}