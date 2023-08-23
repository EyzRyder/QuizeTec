import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useQuizStore } from "../../../src/lib/store";
import { shallow } from "zustand/shallow";

export default function Question() {
  const router = useRouter();
  const { id, questionIndex } = useLocalSearchParams();
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
  const CurQuestion = quiz.Questions[Number(questionIndex)]
  return (
    <View className="py-6 px-5 flex-1">
      <Text>{CurQuestion.title}</Text>
      <View className="flex-1">
        {CurQuestion.answers.map((answer) => (
          <TouchableOpacity className={`flex-row bg-[${getBGColorByMateria(quiz.materia)}]`}>
            <Text>{answer.id}</Text>
            <Text>{answer.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity className={`bg-[${getBGColorByMateria(quiz.materia)}]`}>
        <Text>
          Confirmar
        </Text>
      </TouchableOpacity>
    </View>
  )
}
