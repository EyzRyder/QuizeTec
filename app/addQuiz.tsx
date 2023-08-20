import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'

export default function addQuiz() {
  const router = useRouter()

  return (
    <View className='flex-1 px-8 py-10'>
      <View className='flex-row'>
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center">
          <Icon name="chevron-left" size={32} color="#4A92FF" />
        </TouchableOpacity>
      <Text className='text-center font-title text-2xl leading-tight '>Inicio</Text>
      </View>
    </View>
  );
}
