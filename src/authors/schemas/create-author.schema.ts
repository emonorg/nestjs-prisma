import { z } from 'zod';

export const CreateAuthorSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(4),
  })
  .strict();

export type CreateAuthorDto = z.infer<typeof CreateAuthorSchema>;
