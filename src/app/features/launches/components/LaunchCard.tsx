import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Launch } from "../../../core/models/Launch";

type RootStackParamList = {
  LaunchDetail: { id: string };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LaunchDetail"
>;

type Props = {
  launch: Launch;
};

const LaunchCard: React.FC<Props> = ({ launch }) => {
  const navigation = useNavigation<NavigationProp>();

  const statusColor =
    launch.success === true
      ? styles.statusSuccess
      : launch.success === false
      ? styles.statusFailed
      : styles.statusPending;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LaunchDetail", { id: launch.id })}
      style={styles.card}
    >
      {launch.images && launch.images.length > 0 ? (
        <Image
          source={{ uri: launch.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No image</Text>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.missionName}>{launch.missionName}</Text>
        <Text style={styles.subText}>Rocket: {launch.rocketId}</Text>
        <Text style={styles.subText}>
          Date: {new Date(launch.launchDate).toLocaleDateString()}
        </Text>
        <Text style={[styles.statusText, statusColor]}>
          {launch.success === true
            ? "Success"
            : launch.success === false
            ? "Failed"
            : "Pending"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#d9d9d962",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  textContainer: {
    flex: 1,
  },
  missionName: {
    fontSize: 18,
    fontWeight: "600",
  },
  subText: {
    color: "#4B5563",
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statusSuccess: {
    color: "#16A34A",
  },
  statusFailed: {
    color: "#DC2626",
  },
  statusPending: {
    color: "#CA8A04",
  },
});

export default LaunchCard;
