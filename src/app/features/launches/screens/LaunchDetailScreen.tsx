import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Launch } from "../../../core/models/Launch";
import { LaunchRepository } from "../../../core/repositories/launchRepository";
import { RootStackParamList } from "../../../navigation/StackNavigator";

type LaunchDetailRouteProp = RouteProp<RootStackParamList, "LaunchDetail">;

const LaunchDetailScreen = () => {
  const { params } = useRoute<LaunchDetailRouteProp>();
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaunch = async () => {
      try {
        const repo = new LaunchRepository();
        const data = await repo.getLaunchById(params.id);
        setLaunch(data);
      } catch (e) {
        console.error("Error loading launch:", e);
        setError("No se pudo obtener el lanzamiento.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunch();
  }, [params.id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!launch || error) {
    return (
      <View style={styles.centeredWithPadding}>
        <Text style={styles.errorText}>{error ?? "Error desconocido"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>{launch.missionName}</Text>
      <Text style={styles.detailText}>Cohete: {launch.rocketId}</Text>
      <Text style={styles.detailText}>
        Fecha: {new Date(launch.launchDate).toLocaleDateString()}
      </Text>
      <Text style={styles.detailText}>
        Estado: {launch.success ? "Éxito" : "Fallo"}
      </Text>
      <Text style={styles.detailText}>Plataforma: {launch.platform}</Text>

      <Text style={styles.payloadTitle}>Payloads</Text>
      {launch.payloads.length > 0 ? (
        launch.payloads.map((p, idx) => (
          <Text key={idx} style={styles.payloadItem}>• {p}</Text>
        ))
      ) : (
        <Text style={styles.noPayload}>Sin payloads</Text>
      )}

      {launch.images?.[0] && (
        <Image
          source={{ uri: launch.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </ScrollView>
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
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailText: {
    color: "#374151",
    marginBottom: 4,
  },
  payloadTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  payloadItem: {
    color: "#4B5563",
  },
  noPayload: {
    color: "#9CA3AF",
  },
  image: {
    width: "100%",
    height: 256,
    marginTop: 16,
    borderRadius: 16,
  },
});

export default LaunchDetailScreen;
