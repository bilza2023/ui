import { z } from "zod";
import { text as TEXT_DEFAULTS } from "./items-data-structure-16may2025";
import { SlidesDataSchema } from "./zod-items-schema-16may2025.js";

// Individual item schemas
const TextItemSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number().optional(),

  fontSize: z.number().default(TEXT_DEFAULTS.fontSize),
  fontFamily: z.string().default(TEXT_DEFAULTS.fontFamily),
  color: z.string().default(TEXT_DEFAULTS.color),
  textAlign: z.enum(["left", "center", "right"]).default(TEXT_DEFAULTS.textAlign),
  lineHeight: z.number().default(TEXT_DEFAULTS.lineHeight),

  backgroundColor: z.string().nullable().default(TEXT_DEFAULTS.backgroundColor),
  padding: z.number().default(TEXT_DEFAULTS.padding),

  borderColor: z.string().nullable().default(TEXT_DEFAULTS.borderColor),
  borderWidth: z.number().default(TEXT_DEFAULTS.borderWidth),

  rotation: z.number().default(TEXT_DEFAULTS.rotation),
  zIndex: z.number().default(TEXT_DEFAULTS.zIndex),
  visible: z.boolean().default(TEXT_DEFAULTS.visible)
});

// Union schema — extend this with other types like rect, circle
const ItemSchema = z.discriminatedUnion("type", [TextItemSchema]);

export function validate(item) {
  const result = ItemSchema.safeParse(item);
  return {
    valid: result.success,
    errors: result.success ? [] : result.error.errors.map(e => e.message)
  };
}

export function validateAll(items) {
  const report = [];
  items.forEach((item, index) => {
    const result = validate(item);
    if (!result.valid) {
      report.push({ index, item, errors: result.errors });
    }
  });
  return {
    valid: report.length === 0,
    report
  };
}

export function removeInvalid(items) {
  return items.filter(item => validate(item).valid);
}

export function validateSlidesData(slidesData) {
  const result = SlidesDataSchema.safeParse(slidesData);
  return {
    valid: result.success,
    errors: result.success ? [] : result.error.errors.map(e => e.message)
  };
}
