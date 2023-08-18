import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'

export default function App() {
  return (
    <View className='flex-1 items-center px-8 py-10 gap-4'>
      <Text className='text-center font-title text-2xl leading-tight'>Hora de começar a se aventurar na aprendizado!</Text>
      <Link href="/login" asChild>
        <TouchableOpacity className="w-full items-center justify-center rounded-lg bg-blue-500 py-2">
          <Text className='text-white'>
          Entrar
          </Text>
        </TouchableOpacity>
      </Link>
      <Link href="/sobre" asChild>
        <TouchableOpacity className="w-full items-center justify-center rounded-lg py-2">
          <Text>
          Sobre Nós
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
