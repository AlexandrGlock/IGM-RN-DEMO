"use client";

import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getGameDetails } from '../../services/rawgApi';
import { Ionicons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

// Определяем расширенный тип для деталей игры
type GameDetails = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  image_background: string | null;
  description: string;
  released: string | null;
  rating: number;
  metacritic: number | null;
  genres: { id: number; name: string; slug: string; }[];
  platforms: { platform: { id: number; name: string; slug: string; }; }[];
  publishers: { id: number; name: string; slug: string; }[];
  developers: { id: number; name: string; slug: string; }[];
};

export default function GameDetailScreen() {
  const params = useLocalSearchParams();
  const id = params.id; // Получаем ID
  const { width } = useWindowDimensions(); // Для рендеринга HTML

  console.log('Detail Screen received ID:', id); // Оставляем логирование для отладки ID

  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === 'string') {
      const fetchGameDetails = async () => {
        setLoading(true);
        const gameId = parseInt(id, 10);
        if (!isNaN(gameId)) {
          const details = await getGameDetails(gameId);
          setGameDetails(details);
        } else {
           console.error("Invalid game ID:", id);
        }
        setLoading(false);
      };
      fetchGameDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}> 
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!gameDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Game details not found or invalid ID.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {gameDetails.image_background && (
        <Image source={{ uri: gameDetails.image_background }} style={styles.image} />
      )}
      <Text style={styles.title}>{gameDetails.name}</Text>
      <View style={styles.infoRow}>
        <Ionicons name="star" size={18} color="gold" />
        <Text style={styles.text}>Rating: {gameDetails.rating}</Text>
      </View>
      {gameDetails.metacritic !== null && (
        <View style={styles.infoRow}>
          <Ionicons name="book" size={18} color="green" />
          <Text style={styles.text}>Metacritic: {gameDetails.metacritic}</Text>
        </View>
      )}
      {gameDetails.released && (
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={18} color="gray" />
          <Text style={styles.text}>Released: {gameDetails.released}</Text>
        </View>
      )}

      {gameDetails.genres && gameDetails.genres.length > 0 && (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Genres:</Text>
          <Text style={styles.text}>{gameDetails.genres.map(g => g.name).join(', ')}</Text>
        </View>
      )}

      {gameDetails.platforms && gameDetails.platforms.length > 0 && (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Platforms:</Text>
          <Text style={styles.text}>{gameDetails.platforms.map(p => p.platform.name).join(', ')}</Text>
        </View>
      )}

       {gameDetails.publishers && gameDetails.publishers.length > 0 && (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Publishers:</Text>
          <Text style={styles.text}>{gameDetails.publishers.map(p => p.name).join(', ')}</Text>
        </View>
      )}

       {gameDetails.developers && gameDetails.developers.length > 0 && (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Developers:</Text>
          <Text style={styles.text}>{gameDetails.developers.map(d => d.name).join(', ')}</Text>
        </View>
      )}

      {gameDetails.description && (gameDetails.description.length > 0) && (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Description:</Text><HTML contentWidth={width} source={{ html: gameDetails.description }} baseStyle={styles.descriptionText} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoSection: { 
    marginBottom: 12,
  },
  sectionTitle: { 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    marginLeft: 8, 
    flexShrink: 1, 
  },
  descriptionText: {
    fontSize: 16,
  }
});
