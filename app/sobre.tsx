import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'
import { useRouter } from 'expo-router'

export default function Sobre() {
  const router = useRouter()

  return (
    <View className='flex-1 items-center px-8 py-10'>
      <View className='flex-row'>
        <TouchableOpacity
          onPress={()=>router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
          <Icon name="arrow-left" size={16} color="#FFF" />
        </TouchableOpacity>
      <Text className='flex-1 text-center font-bold font-title text-2xl leading-tight'>Sobre</Text>
      </View>
      <Text className='text-xl leading-tight'>Programadores</Text>
      <Text className='leading-tight'>Gabriel Bessi</Text>
    </View>
  );
}
