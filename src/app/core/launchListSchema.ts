import { z } from "zod";

export const launchListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  date_utc: z.string(),
});

export const launchListSchema = z.array(launchListItemSchema);
export type LaunchListItem = z.infer<typeof launchListItemSchema>;
