import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useTheme } from '../../constants/ThemeContext';

type TabName = "index" | "explore" | "about";
type IconName = ComponentProps<typeof Ionicons>["name"];

const icons: Record<TabName, IconName> = {
  index:   "search",
  explore: "compass",
  about:   "information-circle",
};

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
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
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      })}
    >
      <Tabs.Screen name="index"   options={{ }} />
      <Tabs.Screen name="explore" options={{ }} />
      <Tabs.Screen name="about"   options={{ }} />
    </Tabs>
  );
}
