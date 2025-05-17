import { z } from "zod";
import { text, rect, circle } from "./items-data-structure-16may2025.js";

const TextItemSchema = z.object({
  type: z.literal("text"),
  text: z.string(),

  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number().optional(),

  fontSize: z.number().default(text.fontSize),
  fontFamily: z.string().default(text.fontFamily),
  color: z.string().default(text.color),
  textAlign: z.enum(["left", "center", "right"]).default(text.textAlign),
  lineHeight: z.number().default(text.lineHeight),

  backgroundColor: z.string().nullable().default(text.backgroundColor),
  padding: z.number().default(text.padding),

  borderColor: z.string().nullable().default(text.borderColor),
  borderWidth: z.number().default(text.borderWidth),

  rotation: z.number().default(text.rotation),
  zIndex: z.number().default(text.zIndex),
  visible: z.boolean().default(text.visible)
});

const RectItemSchema = z.object({
  type: z.literal("rect"),

  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),

  fill: z.string().default(rect.fill),
  borderColor: z.string().nullable().default(rect.borderColor),
  borderWidth: z.number().default(rect.borderWidth),

  rotation: z.number().default(rect.rotation),
  zIndex: z.number().default(rect.zIndex),
  visible: z.boolean().default(rect.visible)
});

const CircleItemSchema = z.object({
  type: z.literal("circle"),

  x: z.number(),
  y: z.number(),
  radius: z.number(),

  fill: z.string().default(circle.fill),
  borderColor: z.string().nullable().default(circle.borderColor),
  borderWidth: z.number().default(circle.borderWidth),

  rotation: z.number().default(circle.rotation),
  zIndex: z.number().default(circle.zIndex),
  visible: z.boolean().default(circle.visible)
});

const ImageItemSchema = z.object({
  type: z.literal("image"),

  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  src: z.string(), // must match one of the values from your imagesList enum

  rotation: z.number().default(0),
  zIndex: z.number().default(0),
  visible: z.boolean().default(true)
});

// Master union schema
export const ItemSchema = z.discriminatedUnion("type", [
  TextItemSchema,
  RectItemSchema,
  CircleItemSchema,
  ImageItemSchema
]);

///////////////////////////////////////////////////////////
//background and patterns
// Pattern types
const GridPattern = z.object({
  type: z.literal("grid"),
  cellWidth: z.number(),
  cellHeight: z.number(),
  lineColor: z.string(),
  lineWidth: z.number()
});

const DotsPattern = z.object({
  type: z.literal("dots"),
  dotRadius: z.number(),
  spacingX: z.number(),
  spacingY: z.number(),
  color: z.string()
});

const LinesPattern = z.object({
  type: z.literal("lines"),
  direction: z.enum(["horizontal", "vertical"]),
  spacing: z.number(),
  lineColor: z.string(),
  lineWidth: z.number()
});

// Discriminated union
const PatternSchema = z.discriminatedUnion("type", [
  GridPattern,
  DotsPattern,
  LinesPattern
]);

// Background object
export const BackgroundSchema = z.object({
  backgroundImage: z.string().nullable(),
  pattern: PatternSchema.nullable()
});

///////////////////////////////////////////////////////////
// Slide-level schema
// export const SlideSchema = z.object({
//   id: z.string(),
//   startTime: z.number(),
//   endTime: z.number(),
//   backgroundColor: z.string().optional(),
//   items: z.array(ItemSchema)
// });
export const SlideSchema = z.object({
  id: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  backgroundColor: z.string().optional(),
  background: BackgroundSchema.optional(), // ✅ new
  items: z.array(ItemSchema)
});

// Top-level slidesData schema
export const SlidesDataSchema = z.object({
  designWidth: z.number(),
  designHeight: z.number(),
  slides: z.array(SlideSchema)
});
