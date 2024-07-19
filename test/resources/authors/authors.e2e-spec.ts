import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateAuthorDto } from 'src/authors/schemas/create-author.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';

describe('Authors', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
    await prisma.$executeRaw`TRUNCATE TABLE Author;`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
  });

  it('should create a new author', () => {
    const newAuthor: CreateAuthorDto = {
      email: 'john.doe@example.com',
      name: 'John Doe',
    };

    return request(app.getHttpServer())
      .post('/authors')
      .send(newAuthor)
      .expect(201);
  });

  it('should return an array of authors', () => {
    return request(app.getHttpServer())
      .get('/authors')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });
});
