import { z } from "zod";

export const themeTemplateSchema = z.enum([
  "default",
  "minimal",
  "modern",
  "vibrant",
  "professional",
  "creative",
]);

export const themeButtonStyleSchema = z.enum(["rounded", "square", "pill"]);
export const themeFontFamilySchema = z.enum([
  "jakarta",
  "bricolage",
  "space",
  "playfair",
  "Inter",
  "Roboto",
  "Open Sans",
  "Poppins",
  "Montserrat",
]);
export const themeBackgroundTypeSchema = z.enum(["template", "solid", "gradient"]);
export const themeMotionPresetSchema = z.enum(["steady", "smooth", "energetic"]);
export const themeInteractionPresetSchema = z.enum(["press", "lift", "glide"]);

const optionalTrimmedString = z.string().trim().optional();

export const themeInputSchema = z.object({
  template: themeTemplateSchema.optional(),
  backgroundColor: z.string().trim().min(1),
  textColor: z.string().trim().min(1),
  linkColor: z.string().trim().min(1),
  buttonStyle: themeButtonStyleSchema,
  fontFamily: themeFontFamilySchema,
  backgroundType: themeBackgroundTypeSchema,
  gradientFrom: optionalTrimmedString,
  gradientTo: optionalTrimmedString,
  motionPreset: themeMotionPresetSchema,
  interactionPreset: themeInteractionPresetSchema,
});

export const profileInputSchema = z.object({
  email: z.string().trim().email(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().optional().default(""),
  imageUrl: z.string().trim().optional().default(""),
  username: z.string().trim().min(3),
  bio: z.string().trim().optional(),
  title: z.string().trim().optional(),
});

export const profileUpdateSchema = profileInputSchema.partial().extend({
  email: z.string().trim().email().optional(),
});

export const linkInputSchema = z.object({
  title: z.string().trim().min(1),
  url: z.string().trim().url(),
  description: z.string().trim().optional(),
  icon: z.string().trim().optional(),
});

export type ThemeInput = z.infer<typeof themeInputSchema>;
export type ProfileInput = z.infer<typeof profileInputSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type LinkInput = z.infer<typeof linkInputSchema>;
