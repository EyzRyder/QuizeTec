import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from '@expo/vector-icons/Feather'
import { useQuizStore } from "../../../src/lib/store";
import { shallow } from 'zustand/shallow';

export default function Menu() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const quiz = useQuizStore(
    (store) => store.quizes.filter((task) => task.id === id)[0],
    shallow
  );

  function getBGColorByMateria(materia: string): string {
    if (materia === 'Biologia') return '#FD746C'
    if (materia === 'Física') return '#FC67FA'
    if (materia === 'Portuguese') return '#0083FE'
    return '#4A92FF'
  }

  return (
    <View className="flex-1">
      <View className={`relative flex-row px-2 pt-20 pb-12 justify-center items-center rounded-b-3xl bg-[${getBGColorByMateria(quiz.materia)}]`}>
        <TouchableOpacity
          onPress={() => { router.back() }}
          className="absolute top-10 left-6 h-10 w-10 items-center justify-center bg-white rounded-full">
          <Icon name="chevron-left" size={32} color={getBGColorByMateria(quiz.materia)} />
        </TouchableOpacity>
        <View className="justify-center items-center space-y-3">
          <View className="h-32 w-32 bg-gray-500"></View>
          <Text className="text-white text-xl font-title">{quiz.title}</Text>
          <View className="flex-row space-x-2">
            <View className="rounded-md mix-blend-soft-light bg-[#1e293b66] py-1 px-4">
              <Text className="text-white font-body text-base">{quiz.materia}</Text>
            </View>
            <View className="rounded-md mix-blend-soft-light bg-[#35353666] py-1 px-4">
              <Text className="text-white font-body text-base">Nível {quiz.level}</Text>
            </View>
          </View>

        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingHorizontal:20, paddingTop:20, paddingBottom:36, gap:28}} className="flex-1">
        <View className="gap-4">
          <Text className="text-[#888] font-body text-lg">Resultados</Text>
          <View className="flex-row justify-center space-x-5">
            <View className="bg-white rounded-xl px-4 pt-4 pb-5 shadow">
              <View className="flex-row justify-between items-center space-x-8">
                <View className="h-9 w-9 bg-slate-300 rounded-full"></View>
                <View className="flex-row items-center justify-center bg-[#7cfc0033] px-2 py-1 rounded">
                  <Icon name="chevron-down" size={12} color={'#7CFC00'} />
                  <Text className="text-[#7CFC00] text-[10px]">+3 acertos</Text>
                </View>
              </View>
              <Text className="font-title text-xl text-[#2A416F] font-bold">04/05</Text>
              <Text className="text-[#888] font-body text-sm">Total de acertos</Text>
            </View>
            <View className="bg-white rounded-xl px-4 pt-4 pb-5 shadow">
              <View className="flex-row justify-between items-center space-x-8">
                <View className="h-9 w-9 bg-slate-300 rounded-full"></View>
                <View className="flex-row items-center justify-center bg-[#7cfc0033] px-2 py-1 rounded">
                  <Icon name="chevron-down" size={12} color={'#7CFC00'} />
                  <Text className="text-[#7CFC00] text-[10px]">+3 acertos</Text>
                </View>
              </View>
              <Text className="font-title text-xl text-[#2A416F] font-bold">04/05</Text>
              <Text className="text-[#888] font-body text-sm">Total de acertos</Text>
            </View>
          </View>
        </View>
        <View className="">
          <Text className="text-[#888] font-body text-lg">Resultados Anteriores: </Text>
        </View>
      </ScrollView>
      <View className="px-9">
        <TouchableOpacity className={`rounded-2xl bg-[${getBGColorByMateria(quiz.materia)}]`}>
          <Text className="text-2xl font-body text-center py-4 text-white">Jogar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-xl font-body text-center py-4 text-[#2A416F]">Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
