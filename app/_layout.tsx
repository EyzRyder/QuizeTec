import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_900Black
} from '@expo-google-fonts/poppins'


export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_900Black
  })

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <View className="relative flex-1 bg-slate-50">
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
      </Stack>
    </View>
  )
 }