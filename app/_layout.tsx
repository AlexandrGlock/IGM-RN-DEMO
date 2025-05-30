// app/_layout.tsx
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../constants/ThemeContext";
import { useCallback, useEffect, useState } from 'react';
import { View } from "react-native";
import { SplashScreen } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          ...Entypo.font,
          'OpenSans': require('../assets/fonts/OpenSans-Regular.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </View>
  );
}

function RootNavigation() {
  const { theme } = useTheme();

  return (
    <Stack  initialRouteName="(tabs)">
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search-results/[query]"
        options={{
          headerShown: true,
          title: "Search Results",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            color: theme.colors.text,
            fontFamily: 'OpenSans',
          },
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{ title: "Not Found" }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: "Game Details",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontFamily: 'OpenSans' },
        }}
      />
    </Stack>
  );
}
