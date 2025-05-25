import { View, Text, StyleSheet } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.c}>
      <Text style={styles.t}>Страница не найдена 😕</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, justifyContent: "center", alignItems: "center" },
  t: { fontSize: 18 },
});
