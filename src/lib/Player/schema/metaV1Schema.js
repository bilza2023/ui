

import { z } from 'zod';

const metaEntrySchema = z.object({
  label:  z.string(),
  end:    z.number(),
  items:  z.array(z.number()),
  images: z.array(z.string()).optional()
});

export const metaV1Schema = z.object({
  version: z.literal("meta-v1"),
  entries: z.array(metaEntrySchema)
});
