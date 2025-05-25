// app/(tabs)/index.tsx
"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RAWG_KEY = "36cea21ff3204e468e5f07538178ba86";

type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
};

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal }
        );
        const json = await res.json();
        setResults(json.results ?? []);
      } catch (e: any) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    };

    // небольшой дебаунс
    const t = setTimeout(load, 300);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите имя игры..."
        value={query}
        onChangeText={setQuery}
      />

      {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}

      <FlatList
        data={results}
        keyExtractor={(g) => String(g.id)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => {
              console.log('Navigating to detail with ID:', item.id);
              router.push({
                pathname: "/detail/[id]",
                params: { id: item.id },
              });
            }}
          >
            <Image
              source={{ uri: item.background_image }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.sub}>
                {item.released} • ⭐ {item.rating}
              </Text>
            </View>
          </Pressable>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 0,
    paddingBottom: 0,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: { width: 100, height: 60 },
  info: { flex: 1, padding: 8, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  sub: { fontSize: 12, color: "#555" },
});
