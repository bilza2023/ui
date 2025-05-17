import { z } from "zod";
// import { text as TEXT_DEFAULTS } from "./items-data-structure-16may2025";
import { SlidesDataSchema } from "../../lib/deckBuilder/schemas/zod-items-schema-16may2025";
import { ItemSchema } from "../../lib/deckBuilder/schemas/zod-items-schema-16may2025.js";


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
