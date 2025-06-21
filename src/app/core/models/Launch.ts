export interface Launch {
  id: string;
  missionName: string;
  rocketId: string;
  launchDate: string;
  success: boolean | null;
  platform: string;
  payloads: string[];
  images: string[];
}
