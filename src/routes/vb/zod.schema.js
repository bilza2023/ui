
import { z } from "zod";

// 🔹 Base fields common to all items
const BaseItemSchema = z.object({
  type: z.string(),
  x: z.number(),
  y: z.number(),
  zIndex: z.number().optional(),
});

// 🔸 Specific item types

const TextItemSchema = BaseItemSchema.extend({
  type: z.literal("text"),
  text: z.string(),
  themeRole: z.string(),
  width: z.number(),
  height: z.number(),
  fontSize: z.number(),
  fontFamily: z.string(),
  textAlign: z.string(),
  lineHeight: z.number(),
  padding: z.number(),
  backgroundColor: z.union([z.string(), z.null()]),
  borderColor: z.union([z.string(), z.null()]),
  borderWidth: z.number(),
  showAt: z.number(),
  rotation: z.number(),
  visible: z.boolean()
});

const CircleItemSchema = BaseItemSchema.extend({
  type: z.literal("circle"),
  radius: z.number(),
  fill: z.number(),
  alpha: z.number(),
  lineColor: z.number(),
  lineWidth: z.number()
});

const ImageItemSchema = BaseItemSchema.extend({
  type: z.literal("image"),
  src: z.string(),
  width: z.number(),
  height: z.number(),
  anchorX: z.number().optional(),
  anchorY: z.number().optional(),
  rotation: z.number().optional()
});

const RectItemSchema = BaseItemSchema.extend({
  type: z.literal("rect"),
  width: z.number(),
  height: z.number(),
  fill: z.number(),
  alpha: z.number(),
  lineColor: z.number(),
  lineWidth: z.number()
});

// 🔹 Combined item validator
const ItemSchema = z.union([
  TextItemSchema,
  CircleItemSchema,
  RectItemSchema,
  ImageItemSchema
]);

// 🔹 Slide schema
const SlideSchema = z.object({
  id: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  items: z.array(ItemSchema), // ✅ FIXED to use ItemSchema
  backgroundColor: z.union([z.string(), z.number()]),
  background: z.record(z.any())
});

// 🔹 Full slidesData schema
export const SlidesDataSchema = z.object({
  designWidth: z.number(),
  designHeight: z.number(),
  slides: z.array(SlideSchema)
});
