import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ZodValidationPipe } from 'src/utils/validation-pipes/zod-validation.pipe';
import { z } from 'zod';

// Example DTO and Zod schema
const TestSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
});

class TestDto {
  username!: string;
  email!: string;
}

describe('ZodValidationPipe', () => {
  let pipe: ZodValidationPipe;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    pipe = new ZodValidationPipe(reflector);
  });

  it('should pass validation with correct data', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(TestSchema);

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: '',
    };

    const value = {
      username: 'testuser',
      email: 'test@example.com',
    };

    expect(pipe.transform(value, metadata)).toEqual(value);
  });

  it('should throw an error with incorrect data', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(TestSchema);

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: '',
    };

    const value = {
      username: 'tu',
      email: 'invalid-email',
    };

    try {
      pipe.transform(value, metadata);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      if (e instanceof BadRequestException) {
        const response = e.getResponse();
        expect(response).toEqual({
          statusCode: 400,
          message: expect.arrayContaining([
            expect.objectContaining({
              code: expect.any(String),
              message: expect.any(String),
              path: expect.any(Array),
            }),
          ]),
          error: 'Bad Request',
        });
      }
    }
  });

  it('should pass through non-object types without validation', () => {
    const metadata: ArgumentMetadata = {
      type: 'query',
      metatype: String,
      data: '',
    };

    const value = 'some string';

    expect(pipe.transform(value, metadata)).toEqual(value);
  });

  it('should pass through if no schema is found', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(undefined);

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: '',
    };

    const value = {
      username: 'testuser',
      email: 'test@example.com',
    };

    expect(pipe.transform(value, metadata)).toEqual(value);
  });

  it('should skip validation if metatype is not a class', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(TestSchema);

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: Number, // Not a class
      data: '',
    };

    const value = 123;

    expect(pipe.transform(value, metadata)).toEqual(value);
  });

  it('should handle errors that are not BadRequestException', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(TestSchema);

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: '',
    };

    const value = {
      username: 'tu',
      email: 'invalid-email',
    };

    const originalParse = TestSchema.safeParse;
    TestSchema.safeParse = jest.fn(() => {
      throw new Error('Unexpected error');
    });

    try {
      pipe.transform(value, metadata);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      if (e instanceof Error) {
        // Type guard to ensure e is an instance of Error
        expect(e.message).toBe('Unexpected error');
      }
    } finally {
      TestSchema.safeParse = originalParse;
    }
  });
});
