import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { Launch } from '../../../core/models/Launch';
import { LaunchRepository } from '../../../core/repositories/launchRepository';
import LaunchCard from '../components/LaunchCard';

const UpcomingLaunchesScreen = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const repo = new LaunchRepository();
        const data = await repo.getUpcomingLaunches();
        setLaunches(data);
      } catch (err) {
        console.error("Error fetching upcoming launches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próximos Lanzamientos</Text>
      <FlatList
        data={launches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LaunchCard launch={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay lanzamientos programados.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 32,
  },
});

export default UpcomingLaunchesScreen;
