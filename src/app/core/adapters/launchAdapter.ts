export const adaptLaunch = (raw: any) => ({
  id: raw.id,
  missionName: raw.name,
  rocketId: raw.rocket,
  launchDate: raw.date_utc,
  success: raw.success,
  launchpadId: raw.launchpad,
  payloads: raw.payloads,
  images: raw.links?.flickr?.original ?? [],
  platform: raw.launchpad || "Desconocido",
});
