import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private reflector: Reflector) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.isClass(metadata.metatype)) {
      return value;
    }

    const schema = this.reflector.get<ZodObject<any>>(
      'zodSchema',
      metadata.metatype,
    );
    if (!schema) {
      return value;
    }

    const result = schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    return value;
  }

  private isClass(metatype: Type<any>): boolean {
    return (
      typeof metatype === 'function' && /^\s*class\s+/.test(metatype.toString())
    );
  }
}
