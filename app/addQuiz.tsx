import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'

export default function addQuiz() {
  const router = useRouter()

  return (
    <View className='flex-1 items-center px-8 py-10'>
      <View className='flex-row'>
        <TouchableOpacity
          onPress={() => router.push('/addQuiz')}
          className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
          <Icon name="arrow-left" size={16} color="#FFF" />
        </TouchableOpacity>
      <Text className='text-center font-title text-2xl leading-tight '>Inicio</Text>
      </View>
    </View>
  );
}
