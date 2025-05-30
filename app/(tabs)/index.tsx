// app/(tabs)/index.tsx
"use client";

import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SplashScreen, useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/ThemeContext';
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
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    let t: number | undefined;

    if (query.length >= 2) {
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

      t = setTimeout(load, 300);
    } else {
      setResults([]);
      controller.abort();
      if (t) clearTimeout(t);
    }

    return () => {
      if (t) clearTimeout(t);
      controller.abort();
    };
  }, [query, query.length >= 2]);

  const handleSearch = () => {
    if (query.length < 2) {
      return;
    }
    router.navigate(`/search-results/${encodeURIComponent(query)}`);
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      padding: 12,
      paddingTop: 0,
      paddingBottom: 0,
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 12,
      width: '100%',
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.card,
      fontFamily: 'OpenSans',
    },
    searchButton: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
    },
    searchButtonText: {
      color: theme.colors.buttonText,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'OpenSans',
    },
    card: {
      flexDirection: "row",
      marginBottom: 12,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      overflow: "hidden",
    },
    image: { width: 100, height: 60 },
    info: { flex: 1, padding: 8, justifyContent: "center" },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: theme.colors.text, fontFamily: 'OpenSans' },
    sub: { fontSize: 12, color: theme.colors.secondary, fontFamily: 'OpenSans' },
  });

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={30}
      >
        <View style={styles.centeredContainer}>
          <Image
            source={theme.icons.appIcon}
            style={styles.logo}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Введите имя игры..."
            placeholderTextColor={theme.colors.text}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Искать</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
