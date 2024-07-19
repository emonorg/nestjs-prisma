import { Body, Controller, Get, Post } from '@nestjs/common';
import { Author } from '@prisma/client';
import { Validate } from 'src/utils/decorators/validate.decorator';
import { AuthorsService } from './authors.service';
import {
  CreateAuthorDto,
  CreateAuthorSchema,
} from './schemas/create-author.schema';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Post()
  @Validate(CreateAuthorSchema)
  async create(@Body() data: CreateAuthorDto): Promise<Author> {
    return await this.authorsService.create(data);
  }

  @Get()
  async listAuthors(): Promise<Author[]> {
    return await this.authorsService.listAuthors();
  }
}
