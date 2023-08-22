import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_900Black
} from '@expo-google-fonts/poppins'
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_900Black
  })
  const onLayoutRootView = useCallback(async () => {
    if (hasLoadedFonts) {

      await SplashScreen.hideAsync();
    }
  }, [hasLoadedFonts]);

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <View
      className="relative flex-1 bg-slate-50"
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="sobre" />
        <Stack.Screen name="login" />
        <Stack.Screen name="base" />
        <Stack.Screen name="addQuiz" />
      </Stack>
    </View>
  )
 }