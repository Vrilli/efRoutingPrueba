import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LaunchRepository } from "../../../core/repositories/launchRepository";
import { Launch } from "../../../core/models/Launch";
import { RootStackParamList } from "../../../navigation/StackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const LaunchListScreen = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repo = new LaunchRepository();
        const data = await repo.getLaunches();
        setLaunches(data.slice(0, 20));
      } catch (err) {
        console.error(err);
        setError("Error al cargar lanzamientos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredWithPadding}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={launches}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("LaunchDetail", { id: item.id })}
        >
          <Text style={styles.missionName}>{item.missionName}</Text>
          <Text style={styles.launchDate}>
            Fecha: {new Date(item.launchDate).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredWithPadding: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 18,
    textAlign: "center",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  missionName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  launchDate: {
    color: "#6B7280",
  },
});

export default LaunchListScreen;
