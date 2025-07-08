
import { z } from 'zod';
import { deckV1Schema } from './deckSchemas';
import { metaV1Schema } from './metaSchemas';

export const questionSchema = z.object({
  name: z.string().regex(/^[a-z0-9_-]+$/, "Invalid slug format"),
  description: z.string(),
  tags: z.array(z.string()),

  status: z.enum(['draft', 'ready', 'published', 'archived']),
  createdAt: z.string().datetime(),
  editedAt: z.string().datetime(),

  deck: deckV1Schema,
  meta: metaV1Schema
});
