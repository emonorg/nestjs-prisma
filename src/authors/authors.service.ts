import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthorDto } from './schemas/create-author.schema';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuthorDto): Promise<Author> {
    return await this.prisma.author.create({ data });
  }

  async listAuthors(): Promise<Author[]> {
    return await this.prisma.author.findMany({ include: { posts: true } });
  }
}
