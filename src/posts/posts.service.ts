import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './schemas/create-post.schemas';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    const author = await this.prisma.author.findUnique({
      where: { id: data.authorId },
    });

    if (!author) {
      throw new NotFoundException('Author not found!');
    }

    return await this.prisma.post.create({ data });
  }
}
