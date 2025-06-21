import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface FilterSortBarProps {
  selectedStatus: "all" | "success" | "failed";
  selectedSort: "date" | "status";
  sortOrder: "asc" | "desc";
  onStatusChange: (status: FilterSortBarProps["selectedStatus"]) => void;
  onSortChange: (sortBy: FilterSortBarProps["selectedSort"]) => void;
  onOrderToggle: () => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
  selectedStatus,
  selectedSort,
  sortOrder,
  onStatusChange,
  onSortChange,
  onOrderToggle,
}) => {
  return (
    <View style={styles.container}>
      {/* Filtro por estado */}
      <View style={styles.buttonRow}>
        {["all", "success", "failed"].map((status) => (
          <Pressable
            key={status}
            onPress={() => onStatusChange(status as any)}
            style={[
              styles.statusButton,
              selectedStatus === status && styles.selectedStatusButton,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                selectedStatus === status && styles.selectedStatusText,
              ]}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Ordenamiento */}
      <View style={styles.sortRow}>
        {["date", "status"].map((sort) => (
          <Pressable
            key={sort}
            onPress={() => onSortChange(sort as any)}
            style={[
              styles.sortButton,
              selectedSort === sort && styles.selectedSortButton,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                selectedSort === sort && styles.selectedSortText,
              ]}
            >
              Sort by {sort}
            </Text>
          </Pressable>
        ))}

        <Pressable onPress={onOrderToggle} style={styles.orderToggleButton}>
          <Text style={styles.orderToggleText}>
            {sortOrder === "asc" ? "Upward ↑" : "Falling ↓"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 24,
    flexDirection: "column",
    gap: 12,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  selectedStatusButton: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  statusText: {
    fontSize: 14,
    color: "#374151",
  },
  selectedStatusText: {
    color: "#FFFFFF",
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  selectedSortButton: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },
  sortText: {
    fontSize: 14,
    color: "#374151",
  },
  selectedSortText: {
    color: "#FFFFFF",
  },
  orderToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
    borderWidth: 1,
  },
  orderToggleText: {
    fontSize: 14,
    color: "#1F2937",
  },
});

export default FilterSortBar;