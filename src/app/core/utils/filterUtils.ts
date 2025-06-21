import { Launch } from "../models/Launch";

type FilterOptions = {
  query?: string;
  rocketNameMap?: Record<string, string>;
  status?: "success" | "failed" | "upcoming" | "all";
  sortBy?: "date" | "status";
  sortOrder?: "asc" | "desc";
};

export const filterAndSortLaunches = (
  launches: Launch[],
  options: FilterOptions = {}
): Launch[] => {
  const {
    query = "",
    rocketNameMap = {},
    status = "all",
    sortBy = "date",
    sortOrder = "desc",
  } = options;

  let filtered = [...launches];

  // 🔎 Filtrado por nombre de misión o nombre de cohete (mapeado)
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(
      (launch) =>
        launch.missionName.toLowerCase().includes(lowerQuery) ||
        rocketNameMap[launch.rocketId]?.toLowerCase().includes(lowerQuery)
    );
  }

  // ✅ Filtrado por estado
  if (status !== "all") {
    filtered = filtered.filter((launch) => {
      if (status === "success") return launch.success === true;
      if (status === "failed") return launch.success === false;
      if (status === "upcoming") return launch.success === null;
      return true;
    });
  }

  // 🔃 Ordenamiento
  if (sortBy === "date") {
    filtered.sort((a, b) => {
      const dateA = new Date(a.launchDate).getTime();
      const dateB = new Date(b.launchDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  if (sortBy === "status") {
    const getStatusValue = (success: boolean | null) => {
      if (success === true) return 2;
      if (success === false) return 1;
      return 0;
    };
    filtered.sort((a, b) => {
      const statusA = getStatusValue(a.success);
      const statusB = getStatusValue(b.success);
      return sortOrder === "asc" ? statusA - statusB : statusB - statusA;
    });
  }

  return filtered;
};
