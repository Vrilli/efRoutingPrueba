import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import SearchBar from "../components/SearchBar";
import FilterSortBar from "../components/FilterSortBar";
import { Launch } from "../../../core/models/Launch";
import { LaunchRepository } from "../../../core/repositories/launchRepository";
import { filterAndSortLaunches } from "../../../core/utils/filterUtils";
import LaunchCard from "../components/LaunchCard";

const PastLaunchesScreen = () => {
  const [allLaunches, setAllLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "success" | "failed">("all");
  const [sortBy, setSortBy] = useState<"date" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      try {
        const repo = new LaunchRepository();
        const launches = await repo.getPastLaunches();
        setAllLaunches(launches);
      } catch (err) {
        console.error("Error fetching past launches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunches();
  }, []);

  useEffect(() => {
    const result = filterAndSortLaunches(allLaunches, {
      query,
      status,
      sortBy,
      sortOrder,
    });
    setFilteredLaunches(result);
  }, [query, status, sortBy, sortOrder, allLaunches]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lanzamientos Pasados</Text>
      <SearchBar value={query} onChange={setQuery} />
      <FilterSortBar
        selectedStatus={status}
        selectedSort={sortBy}
        sortOrder={sortOrder}
        onStatusChange={setStatus}
        onSortChange={setSortBy}
        onOrderToggle={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      />
      <FlatList
        data={filteredLaunches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LaunchCard launch={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron resultados.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 32,
  },
});

export default PastLaunchesScreen;
