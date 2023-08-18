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
      materia:'Portuguese'
    },
    {
      id:13,
      level: '1',
      materia:'Portuguese'
    },
  ]
  return (
    <View className="flex-1 w-full">
      <View className="w-full h-36 pt-5 px-4 flex-row justify-between bg-blue-500 rounded-b-xl">
        <View>
        <Text>Ola,</Text>
        <Text>Bem Vindo(a) Convidado</Text>
        </View>
        <Icon name="menu" size={16} color="#FFF" />
      </View>
      <View className="flex-1 items-center px-8 py-10 w-full">
        <Text className="text-2xl">Quizes Base</Text>
        <ScrollView className="gap-4 w-full">
          {quizes.map(item => (
            <View key={item.id} className="rounded-lg w-full  bg-teal-500 p-2">
              <Text className="font-bold text-xl text-white">Nível {item.level}</Text>
              <Text className="font-bold text-2xl text-white">{item.materia}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => router.push('/addQuiz')}
          className="w-full items-center justify-center rounded-lg bg-blue-500 py-2">
          <Text className='text-white'>
            Criar Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
