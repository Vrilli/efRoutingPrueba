import { z } from "zod";

export const launchSchema = z.object({
  id: z.string(),
  name: z.string(),
  rocket: z.string(),
  date_utc: z.string(),
  success: z.boolean().nullable(),
  launchpad: z.string(),
  payloads: z.array(z.string()),
  links: z
    .object({
      flickr: z
        .object({
          original: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
});
