"use client";

import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ExploreScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Welcome to Explore!</Text>
      <MaterialCommunityIcons name="rocket" size={64} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 16 },
});
