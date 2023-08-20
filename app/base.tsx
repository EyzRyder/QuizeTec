import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from '@expo/vector-icons/Feather'
import { useRouter } from "expo-router";

export default function Base() {
  const router = useRouter()
  const quizes = [
    {
      id:10,
      level: '1',
      materia:'Portuguese'
    },
    {
      id:12,
      level: '1',
      materia:'Biologia'
    },
    {
      id:13,
      level: '1',
      materia:'Física'
    },
  ]

  function getBGColor(materia: string): string {
    if (materia === 'Biologia') return 'bg-[#FD746C]'
    if (materia === 'Física') return 'bg-[#FC67FA]'
    if (materia === 'Portuguese') return 'bg-[#0083FE]'
    return 'bg-blue-500'
  }
  return (
    <View className="flex-1 w-full">
      <View className="w-full h-36 pt-5 px-4 flex-row justify-between items-center bg-blue-500 rounded-b-3xl">
        <View className="justify-center">
        <Text className="text-white text-2xl">Ola,</Text>
        <Text className="text-white text-2xl">Bem Vindo(a) Convidado</Text>
        </View>
        <Icon name="menu" size={16} color="#FFF" />
      </View>
      <View className="flex-1 px-8 py-10 w-full">
        <Text className="text-2xl">Quizes Base</Text>
        <ScrollView className="gap-4 w-full">
          {quizes.map(item => (
            <View key={item.id} className={`rounded-lg w-fit p-2 ${getBGColor(item.materia)}`}>
              <Text className="font-bold text-xl text-white">Nível {item.level}</Text>
              <Text className="font-bold text-2xl text-white">{item.materia}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => router.push('/addQuiz')}
          className="w-full items-center justify-center rounded-lg bg-blue-500 py-4">
          <Text className='text-white'>
            Criar Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
