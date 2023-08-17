import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <View className="relative flex-1 bg-gray-900">
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