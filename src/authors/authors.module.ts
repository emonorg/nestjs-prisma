import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [],
  controllers: [AuthorsController],
  providers: [PrismaService, AuthorsService],
})
export class AuthorsModule {}
