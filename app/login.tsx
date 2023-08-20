import { Link, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  return (
    <View className='flex-1 items-center px-8 py-10'>
      <View className='pb-4 w-full'>
      <Text className='font-title font-bold text-2xl leading-tight'>Olá</Text>
      <Text className='font-title font-bold text-2xl leading-tight'>Hora do Cadastro!</Text>
      </View>

      <View className='gap-2 w-full'>
      <TextInput
        value={email}
        onChangeText={setEmail}
        className="w-full px-2 py-3 border-2 border-blue-400 font-body text-lg text-gray-50 rounded-lg"
        textAlignVertical="top"
        placeholderTextColor="#56565a"
        placeholder="johndoe@exemplo.com"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        className="w-full px-2 py-3 font-body text-lg text-gray-50 bg-slate-300 rounded-lg"
        textAlignVertical="top"
        placeholderTextColor="#56565a"
        placeholder="********"
      />
        <TouchableOpacity
          onPress={() => router.push('/base')}
          className="w-full items-center justify-center rounded-lg bg-blue-500 py-4">
        <Text className='text-white'>
          Entrar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full items-center justify-center rounded-lg py-2">
        <Text className='text-slate-400'>
          Entrar Com Google
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
