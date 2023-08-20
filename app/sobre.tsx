import { Link } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather'
import { useRouter } from 'expo-router'

export default function Sobre() {
  const router = useRouter()

  return (

    <View className='flex-1 items-center'>
      <View className='flex-row pt-10'>
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-8 w-12 items-center justify-center">
          <Icon name="chevron-left" size={24} color="#2A416F" />
        </TouchableOpacity>
        <Text className='flex-1 font-semibold font-title text-2xl leading-tight text-[#2A416F]'>Sobre</Text>
      </View>
      <ScrollView className='flex-1 px-8'>
        <Text className='text-3xl font-semibold text-center text-[#2A416F] my-6'>O Motivo do {"\n"}desenvolvimento?</Text>
        <View className='bg-blue-500 px-7 py-6 rounded-lg mb-14'>
          <Text className='text-white text-lg font-light'>
            O aplicativo foi inicialmente criado para a Semana Paulo Freire em 2022 e posteriormente redesenhado em 2023, visando oferecer uma interface de usuário (UI) mais atrativa e uma experiência aprimorada. O propósito central do quiz é proporcionar suporte ao aluno na compreensão aprofundada das matérias, através de uma abordagem interativa e didática.
          </Text>
        </View>
        <Text className='text-2xl text-[#2A416F] font-semibold text-center mb-6'>Por Quem?</Text>
        <View className='flex-row justify-between'>

          <View className='space-y-2 justify-center items-center'>
            <View className='bg-slate-700 h-28 w-28 rounded-lg'></View>
            <View>
              <Text className='text-xl'>Gabriel B.</Text>
              <Text className='text-sm w-36'>
                Desenvolvedor Full Stack.
                <Text className='text-sm text-blue-500'>
                  Web
                </Text>
                Designer
              </Text>
            </View>
            <View className='gap-2 flex-row'>
              <View className='w-5 h-5 rounded-full bg-blue-500'></View>
              <View className='w-5 h-5 rounded-full bg-blue-500'></View>
              <View className='w-5 h-5 rounded-full bg-blue-500'></View>
            </View>
          </View>
          <View className='space-y-2 justify-center items-center'>
            <View className='bg-slate-700 h-28 w-28 rounded-lg'></View>
            <View>
              <Text className='text-xl'>Kauã M.</Text>
              <Text className='text-sm  w-36'>
                Desenvolvedor
                <Text className='text-sm text-blue-500'>
                  Full Stack
                </Text>
                . Web Designer
              </Text>
            </View>
            <View className='gap-2 flex-row'>
              <View className='w-5 h-5 rounded-full bg-blue-500'></View>
              <View className='w-5 h-5 rounded-full bg-blue-500'></View>
              <View className='w-5 h-5 rounded-full bg-blue-500'></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}