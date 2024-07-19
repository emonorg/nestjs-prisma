import { Body, Controller, Post } from '@nestjs/common';
import { Post as PostSchema } from '@prisma/client';
import { Validate } from 'src/utils/decorators/validate.decorator';
import { PostsService } from './posts.service';
import { CreatePostDto, CreatePostSchema } from './schemas/create-post.schemas';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @Validate(CreatePostSchema)
  async createPost(@Body() data: CreatePostDto): Promise<PostSchema> {
    return await this.postsService.createPost(data);
  }
}
