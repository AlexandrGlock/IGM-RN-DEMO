import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/ThemeContext';
import HTML from 'react-native-render-html';

const RAWG_KEY = "36cea21ff3204e468e5f07538178ba86"; // Assuming RAWG_KEY is needed here too

type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
};

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams(); // Get query from dynamic route
  const { theme } = useTheme();
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // No need to check query length here as the route won't match without it
    if (typeof query !== 'string') {
        setResults([]); // Clear results if query is not a string (e.g., undefined)
        setLoading(false); // Stop loading if query is invalid
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

    load();

    return () => {
      controller.abort();
    };
  }, [query]); // Rerun effect when query changes

  // Show loading indicator or empty state if query is invalid
  if (loading && typeof query === 'string') {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} color={theme.colors.primary} />;
  }

  if (!results.length && !loading && typeof query === 'string') {
      return <View style={[styles.container, { backgroundColor: theme.colors.background }]}><Text style={[styles.title, { color: theme.colors.text, fontFamily: 'OpenSans' }]}>No results found for "{query}"</Text></View>;
  }

  if (typeof query !== 'string') {
       return <View style={[styles.container, { backgroundColor: theme.colors.background }]}><Text style={[styles.title, { color: theme.colors.text, fontFamily: 'OpenSans' }]}>Invalid search query.</Text></View>;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text, fontFamily: 'OpenSans' }]}>Результаты поиска для "{query}"</Text>
      <FlatList
        data={results}
        keyExtractor={(g) => String(g.id)}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: theme.colors.card }]}
            onPress={() => {
              // Assuming navigation to detail page is the same
              router.push({ pathname: '/detail/[id]', params: { id: item.id } });
            }}
          >
            <Image
              source={{ uri: item.background_image }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: 'OpenSans' }]}>{item.name}</Text>
              <Text style={[styles.sub, { color: theme.colors.secondary, fontFamily: 'OpenSans' }]}>
                {item.released} • ⭐ {item.rating}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: { width: 100, height: 60 },
  info: { flex: 1, padding: 8, justifyContent: "center" },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  sub: { fontSize: 12, color: "#555" },
  text: {
    fontSize: 16,
    marginLeft: 8, 
    flexShrink: 1, 
  },
  descriptionText: {
    fontSize: 16,
  }
}); 