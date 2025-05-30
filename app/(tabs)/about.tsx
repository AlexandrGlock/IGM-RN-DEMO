"use client";

import { View, Text, StyleSheet, Linking, Pressable } from "react-native";
import { useTheme } from '../../constants/ThemeContext';

export default function AboutScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.c, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.h, { color: theme.colors.text, fontFamily: 'OpenSans' }]}>About This App</Text>
      <Text style={[styles.p, { color: theme.colors.text, fontFamily: 'OpenSans' }]}>
        Это демонстрация таб-навигации с поиском игр через RAWG API.
      </Text>
      <Pressable onPress={() => Linking.openURL("https://www.rawg.io")}>
        <Text style={[styles.link, { color: theme.colors.primary, fontFamily: 'OpenSans' }]}>Перейти на rawg.io</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  c:    { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  h:    { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: 'black' },
  p:    { textAlign: "center", marginBottom: 12, color: 'black' },
  link: { color: "#007aff" },
});
