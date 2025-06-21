import { z } from "zod";
import { spacexApi } from "../../api/spacexApi";
import { adaptLaunch } from "../adapters/launchAdapter";

const LaunchSchema = z.object({
  name: z.string(),
  date_utc: z.string(),
  success: z.boolean().nullable(),
  rocket: z.string(),
  launchpad: z.string(),
  payloads: z.array(z.string()),
  links: z.object({
    flickr: z.object({
      original: z.array(z.string()).optional(),
    }),
  }),
});

export const fetchPastLaunches = async () => {
  const res = await spacexApi.get("/launches/past");
  return res.data.map((item: any) => LaunchSchema.parse(item)).map(adaptLaunch);
};
