import { SetMetadata } from '@nestjs/common';
import { ZodSchema as ZodSchemaType } from 'zod';

export const Validate = (schema: ZodSchemaType<any>) =>
  SetMetadata('zodSchema', schema);
