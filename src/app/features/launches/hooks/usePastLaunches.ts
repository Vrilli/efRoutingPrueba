import { useEffect, useState } from "react";
import { LaunchRepository } from "../../../core/repositories/launchRepository";
import { Launch } from "../../../core/models/Launch";

const repo = new LaunchRepository();

export const usePastLaunches = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await repo.getPastLaunches();
        setLaunches(data);
      } catch (error) {
        console.error("Error loading launches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { launches, loading };
};
