// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack  initialRouteName="(tabs)">
      {/* 1) Search/Explore/About */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* Добавляем экран detail */}
      <Stack.Screen
        name="detail"
        options={{ title: "Detail" }}
      />

      {/* 3) 404 */}
      <Stack.Screen
        name="+not-found"
        options={{ title: "Not Found" }}
      />
    </Stack>
  );
}
