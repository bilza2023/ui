import { z } from 'zod';

export const deckItemSchema = z.object({
  name: z.string(),
  content: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
  label: z.string().optional(),
  icon: z.string().optional(),
  value: z.number().optional(),
  showAt: z.number()
});

export const deckSlideSchema = z.object({
  type: z.string(),
  start: z.number(),
  end: z.number(),
  data: z.array(deckItemSchema)
});

export const deckV1Schema = z.object({
  version: z.literal("deck-v1"),
  slides: z.array(deckSlideSchema)
});
