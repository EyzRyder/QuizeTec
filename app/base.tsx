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
      id:17,
      level: '1',
      materia:'Biologia'
    },
    {
      id:13,
      level: '1',
      materia:'Física'
    },
    {
      id:133,
      level: '1',
      materia:'Física'
    },
    {
      id:15,
      level: '1',
      materia:'Física'
    },
  ]

  function getBGColorByMateria(materia: string): string {
    if (materia === 'Biologia') return 'bg-[#FD746C]'
    if (materia === 'Física') return 'bg-[#FC67FA]'
    if (materia === 'Portuguese') return 'bg-[#0083FE]'
    return 'bg-blue-500'
  }

  return (
    <View className="flex-1 w-full">
      <View className="pt-11 pb-11 px-6 flex-row justify-between items-center bg-blue-500 rounded-b-3xl">
        <View className="justify-center">
        <Text className="text-white text-2xl">Ola,</Text>
        <Text className="text-white text-2xl">Bem Vindo(a) Convidado</Text>
        </View>
        <Icon name="more-vertical" size={32} color="#FFF" />
      </View>
      <View className="flex-1 px-8 py-10 space-y-2 w-full">
        <Text className="text-3xl text-[#2A416F] font-semibold">Quizes Base</Text>
        <ScrollView contentContainerStyle={{padding:0,margin:0, gap: 32, width:'100%'}}>
          {quizes.map(item => (
            <View key={item.id} className={`rounded-lg w-full p-2 ${getBGColorByMateria(item.materia)}`}>
              <Text className="font-bold text-xl text-white">Nível {item.level}</Text>
              <Text className="font-bold text-2xl text-white">{item.materia}</Text>
            </View>
          ))}
        </ScrollView>
        <Text className="text-3xl text-[#2A416F] font-semibold">Seus Quizes</Text>
        <TouchableOpacity
          onPress={() => router.push('/addQuiz')}
        >
          <View className="w-full flex-row items-center justify-center rounded-lg bg-blue-500 py-4 space-x-2">
          <Text className='text-white text-2xl'>
            Criar Quiz
          </Text>
          <Icon name="plus-circle" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
