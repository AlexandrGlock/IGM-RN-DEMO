import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type TabName = "index" | "explore" | "about";
type IconName = ComponentProps<typeof Ionicons>["name"];

const icons: Record<TabName, IconName> = {
  index:   "search",
  explore: "compass",
  about:   "information-circle",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const name = route.name as TabName;
          return (
            <Ionicons
              name={icons[name]}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="index"   options={{ title: "Search"  }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="about"   options={{ title: "About"   }} />
    </Tabs>
  );
}
