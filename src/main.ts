import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from './utils/validation-pipes/zod-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ZodValidationPipe(reflector));
  await app.listen(3000);
}
bootstrap();
