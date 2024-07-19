import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateAuthorDto } from 'src/authors/schemas/create-author.schema';
import { CreatePostDto } from 'src/posts/schemas/create-post.schemas';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';

describe('Posts', () => {
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
    await prisma.$executeRaw`TRUNCATE TABLE Post;`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
  });

  it('should create a new post', async () => {
    const newAuthor: CreateAuthorDto = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };

    const res = await request(app.getHttpServer())
      .post('/authors')
      .send(newAuthor);

    const newPost: CreatePostDto = {
      title: 'My first post',
      content: 'Hello, world!',
      authorId: res.body.id,
    };

    return request(app.getHttpServer())
      .post('/posts')
      .send(newPost)
      .expect(201);
  });

  it('should throw error when creating post with invalid author id', async () => {
    const newPost: CreatePostDto = {
      title: 'My first post',
      content: 'Hello, world!',
      authorId: faker.string.uuid(),
    };

    return request(app.getHttpServer())
      .post('/posts')
      .send(newPost)
      .expect(404);
  });
});
