import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'

export default function addQuiz() {
  const router = useRouter()

  return (
    <View className='flex-1'>
      <View className='flex-row px-2 pt-12 pb-6 justify-start items-center bg-blue-500 rounded-b-3xl'>
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center">
          <Icon name="chevron-left" size={32} color="#ffff" />
        </TouchableOpacity>
      <Text className='text-center font-title text-2xl leading-tight text-white '>Inicio</Text>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
}
