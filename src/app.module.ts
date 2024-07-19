import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthorsModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
