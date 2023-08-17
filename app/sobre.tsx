import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'

export default function Sobre() {
  return (
    <View className='flex-1 items-center px-8 py-10'>
      <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Sobre</Text>
      <Link href="/" asChild>
        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
          <Icon name="arrow-left" size={16} color="#FFF" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
