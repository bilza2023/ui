// globalThemeSchema.ts

import { z } from "zod";

/**
 * Zod schema for validating a globalTheme object.
 * This schema is versioned with Version Zero.
 * Fields may be added in the future but never removed.
 */

export const globalThemeSchema = z.object({
  // Base layout
  backgroundColor: z.string().describe("Default background color for slides (e.g., '#1a1a1a')"),

  // Text colors
  baseTextColor: z.string().describe("Used for general paragraph or body text"),
  headingColor: z.string().describe("Used for heading elements"),
  bulletColor: z.string().describe("Used for bullet points or list text"),

  // Accent colors
  primaryColor: z.string().describe("Primary accent color for highlights or icons"),
  secondaryColor: z.string().describe("Secondary accent color"),

  // Box/decoration support
  borderColor: z.string().describe("Used for outlines, dividers, and shapes"),
  shadowColor: z.string().describe("Used for element shadows, often in rgba() format"),

  // Fonts
  fontFamilyHeading: z.string().describe("Font used for headings"),
  fontFamilyBase: z.string().describe("Font used for base text"),
});

export type GlobalTheme = z.infer<typeof globalThemeSchema>;
