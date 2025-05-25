"use client";

import { View, Text, StyleSheet, Linking, Pressable } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.c}>
      <Text style={styles.h}>About This App</Text>
      <Text style={styles.p}>
        Это демонстрация таб-навигации с поиском игр через RAWG API.
      </Text>
      <Pressable onPress={() => Linking.openURL("https://www.rawg.io")}>
        <Text style={styles.link}>Перейти на rawg.io</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  c:    { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  h:    { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  p:    { textAlign: "center", marginBottom: 12 },
  link: { color: "#007aff" },
});
