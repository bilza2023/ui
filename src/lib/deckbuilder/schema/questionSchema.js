
import { z } from 'zod';
import { zodDeckV1 } from './ZodDeckV1';

export const questionSchema = z.object({
  name: z.string().regex(/^[a-z0-9_-]+$/, "Invalid slug format"),
  description: z.string(),
  tags: z.array(z.string()),

  status: z.enum(['draft', 'ready', 'published', 'archived']),
  createdAt: z.string().datetime(),
  editedAt: z.string().datetime(),

  deck: zodDeckV1,

});
