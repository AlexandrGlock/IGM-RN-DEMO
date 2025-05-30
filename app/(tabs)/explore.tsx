"use client";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from '../../constants/ThemeContext';

export default function ExploreScreen() {
  const { colorScheme, setThemePreference, theme } = useTheme();

  const toggleTheme = () => {
    if (colorScheme === 'dark') {
      setThemePreference('light');
    } else {
      setThemePreference('dark');
    }
  };

  return (
    <View style={[styles.wrap, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text, fontFamily: 'OpenSans' }]}>Welcome to Explore!</Text>
      <MaterialCommunityIcons name="rocket" size={64} color={theme.colors.text} />
      <Pressable style={styles.themeButton} onPress={toggleTheme}>
        <Text style={[styles.buttonText, { fontFamily: 'OpenSans' }]}>Switch to {colorScheme === 'dark' ? 'Light' : 'Dark'} Mode</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 16 },
  themeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
