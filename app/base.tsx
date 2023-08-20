import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Icon from '@expo/vector-icons/Feather'
import { useRouter } from "expo-router";

const quizes = [
  {
    id: '10',
    opened: true,
    level: '1',
    materia: 'Portuguese'
  },
  {
    id: '12',
    opened: false,
    level: '3',
    materia: 'Biologia'
  },
  {
    id: '17',
    opened: true,
    level: '1',
    materia: 'Biologia'
  },
  {
    id: '13',
    opened: false,
    level: '2',
    materia: 'Física'
  },
  {
    id: '133',
    opened: true,
    level: '1',
    materia: 'Física'
  },
  {
    id: '15',
    opened: false,
    level: '3',
    materia: 'Física'
  },
]

function getBGColorByMateria(materia: string): string {
  if (materia === 'Biologia') return 'bg-[#FD746C]'
  if (materia === 'Física') return 'bg-[#FC67FA]'
  if (materia === 'Portuguese') return 'bg-[#0083FE]'
  return 'bg-blue-500'
}
const QuizCard = ({ id, level, materia, opened }: { id: string, level: string, materia: string, opened:boolean }) => (
  <TouchableOpacity key={id} className={`rounded-lg w-full px-6 py-4 ${getBGColorByMateria(materia)}`}>
    <View className="border-2 border-white rounded-md h-8 w-8 justify-center items-center">
      {opened ? <Icon name="play" size={16} color="#FFF" /> : <Icon name="check" size={16} color="#FFF" />}
    </View>
    <Text className="font-bold text-xl text-white">Nível {level}</Text>
    <Text className="font-bold text-2xl text-white">{materia}</Text>
  </TouchableOpacity>
);

export default function Base() {
  const router = useRouter()

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
        <Text className="text-3xl font-title text-[#2A416F] font-semibold">Quizes Base</Text>
          <FlatList
            data={quizes}
            renderItem={({ item }) => <QuizCard id={item.id} level={item.level} materia={item.materia} opened={item.opened} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 0, margin: 0, gap: 32, width: '100%' }}
          />
        <Text className="text-3xl font-title text-[#2A416F] font-semibold">Seus Quizes</Text>
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
