import { z } from 'zod';

export const CreatePostSchema = z
  .object({
    title: z.string().min(4),
    content: z.string().min(10),
    authorId: z.string().cuid(),
  })
  .strict();

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
