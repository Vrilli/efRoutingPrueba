import { z } from "zod";
import { spacexApi } from "../../api/spacexApi";
import { adaptLaunch } from "../adapters/launchAdapter";
import { launchSchema } from "../validations/launchSchema";
import { Launch } from "../models/Launch";

export class LaunchRepository {
  // 🔹 Trae todos los lanzamientos (equivale a /launches)
  async getLaunches(): Promise<Launch[]> {
    try {
      const response = await spacexApi.get("/launches");

      const parsed = z.array(launchSchema).safeParse(response.data);
      if (!parsed.success) {
        console.error("❌ Error parsing full launches list", parsed.error);
        throw new Error("Failed to parse launches");
      }

      return parsed.data.map(adaptLaunch);
    } catch (error) {
      console.error("❌ Error fetching full launch list", error);
      throw error;
    }
  }

  // 🔹 Lanzamientos pasados
  async getPastLaunches(): Promise<Launch[]> {
    try {
      const response = await spacexApi.get("/launches/past");

      const parsed = z.array(launchSchema).safeParse(response.data);
      if (!parsed.success) {
        console.error("❌ Error parsing past launches", parsed.error);
        throw new Error("Failed to parse past launches");
      }

      return parsed.data.map(adaptLaunch);
    } catch (error) {
      console.error("❌ Error fetching past launches", error);
      throw error;
    }
  }

  // 🔹 Lanzamientos próximos
  async getUpcomingLaunches(): Promise<Launch[]> {
    try {
      const response = await spacexApi.get("/launches/upcoming");

      const parsed = z.array(launchSchema).safeParse(response.data);
      if (!parsed.success) {
        console.error("❌ Error parsing upcoming launches", parsed.error);
        throw new Error("Failed to parse upcoming launches");
      }

      return parsed.data.map(adaptLaunch);
    } catch (error) {
      console.error("❌ Error fetching upcoming launches", error);
      throw error;
    }
  }

  // 🔹 Detalle de un lanzamiento
  async getLaunchById(id: string): Promise<Launch> {
    try {
      const response = await spacexApi.get(`/launches/${id}`);

      const parsed = launchSchema.safeParse(response.data);
      if (!parsed.success) {
        console.error("❌ Error parsing launch by ID", parsed.error);
        throw new Error("Failed to parse launch data");
      }

      return adaptLaunch(parsed.data);
    } catch (error) {
      console.error("❌ Error fetching launch by ID", error);
      throw error;
    }
  }
}
