import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PastLaunchesScreen from "../features/launches/screens/PastLaunchesScreen";
import UpcomingLaunchesScreen from "../features/launches/screens/UpcomingLaunchesScreen";
import LaunchDetailScreen from "../features/launches/screens/LaunchDetailScreen";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParamList = {
  Tabs: undefined;
  LaunchDetail: { id: string };
};

export type TabParamList = {
  Past: undefined;
  Upcoming: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#9480b2" },
        headerTintColor: "#FFFFFF",
        tabBarActiveTintColor: "#9480b2",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: { fontSize: 14 },
        tabBarItemStyle: {
          borderRightWidth: 1,
          borderRightColor: "#E5E7EB",
          paddingRight: 8,
        },
      }}
    >
      <Tab.Screen
        name="Past"
        component={PastLaunchesScreen}
        options={{
          title: "Pasados",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Upcoming"
        component={UpcomingLaunchesScreen}
        options={{
          title: "Próximos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LaunchDetail"
        component={LaunchDetailScreen}
        options={{
          title: "Detalles del Lanzamiento",
          headerStyle: { backgroundColor: "#9480b2" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
