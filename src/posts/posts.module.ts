import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PrismaService, PostsService],
})
export class PostsModule {}
