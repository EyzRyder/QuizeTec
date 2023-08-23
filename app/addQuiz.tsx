import { useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/Feather'
import { ElementType, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Modal, SafeAreaView, FlatList, TextInput, Switch } from 'react-native';
import { useNewQuiz, useQuestionsStore, useQuizStore } from '../src/lib/store';
const { width } = Dimensions.get('window');
import uuid from 'react-native-uuid';
import { LinearGradient } from 'expo-linear-gradient';

interface OptionsType {
  id: string
  nome: string
}

const levelsOptions: OptionsType[] = [
  {
    id: '1',
    nome: "1"
  },
  {
    id: '2',
    nome: "2"
  },
  {
    id: '3',
    nome: "3"
  },
]

const materiaOptions: OptionsType[] = [
  {
    id: '1',
    nome: 'Biologia',
  },
  {
    id: '2',
    nome: 'Portuguese',
  },
  {
    id: '3',
    nome: 'Física',
  },
]

const SelectOptions = ({ item, selected, change }) => {
  return (
    <TouchableOpacity
      onPress={() => change(item.nome, item.id)}
      className={`flex-row items-center justify-between border-b-2 border-[#ddd] p-3 ${item.id === selected && 'bg-slate-200'}`}
    >
      <Text className='text-sm text-[#555]'>
        {item.nome}
      </Text>
      {item.id === selected && <Icon name='check' size={26} color={'green'} />}
    </TouchableOpacity>
  )
}

const Select = ({ options, onChangeSelect, text, OptionComponent }: { text: string, options: OptionsType[], onChangeSelect: (select: string) => void, OptionComponent: ElementType }) => {
  const [txt, setTxt] = useState(text);
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  function renderOption(item: OptionsType) {
    return <OptionComponent item={item} selected={selected} change={(nome, id) => {
      setModalVisible(false);
      onChangeSelect(nome)
      setSelected(id)
      setTxt(nome)
    }} />
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className='h-[50px] mb-3 flex-row justify-between items-center bg-[#f8f9fa] px-4 mx-5 rounded-2xl border-4 border-blue-500'>
        <Text className={`text-base w-[${width - 90}px]`} numberOfLines={1}>{txt}</Text>
        <Icon name='chevron-down' size={26} color={'blue'} />
      </TouchableOpacity>
      <Modal
        animationType='fade'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView>
          <View className='flex-row items-center justify-between px-3 py-3 border-b-2 border-[#ddd]'>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
            >
              <Icon name='chevron-left' size={30} color={'#2A416F'} />
            </TouchableOpacity>
            <Text className='font-title text-lg text-[#2A416F]'>{text}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
            >
              <Text className='text-sm font-bold text-[#2A416F]'>Cancela</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={item => item.id}
            renderItem={({ item }) => renderOption(item)}
          />
        </SafeAreaView>
      </Modal>
    </>
  )
}

export default function addQuiz() {
  const router = useRouter()
  const { addQuiz } = useQuizStore()
  const { questions, addQuestion, deleteQuestion, resetQuestion } = useQuestionsStore()
  const { quiz, addLevel, addMateria, addTitle, resetQuiz } = useNewQuiz()
  const [modalQVisible, setModalQVisible] = useState(false);
  const [questaoId, setQuestaoId] = useState<string|null>(null);
  const [questao, setQuestao] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [answerARight, setAnswerARight] = useState(false);
  const [answerBRight, setAnswerBRight] = useState(false);
  const [answerCRight, setAnswerCRight] = useState(false);
  const [answerDRight, setAnswerDRight] = useState(false);

  function adicionarQuiz() {
    if (!quiz.title) return alert('Falta Preencher o Titulo')
    if (!quiz.level) return alert('Falta Selecionar o Nível')
    if (!quiz.materia) return alert('Falta Selecionar o Materia')
    if (!quiz.Questions) return alert('Falta Adicionar o Questoes')
    addQuiz({ ...quiz, id: String(uuid.v4()), Questions: questions })
    goBack()
  }
  function fullReset() {
    resetQuiz()
    resetQuestion()
  }
  function resetQuestionAnswers() {
    setQuestao('');
    setAnswerA('');
    setAnswerB('');
    setAnswerC('');
    setAnswerD('');
    setAnswerARight(false);
    setAnswerBRight(false);
    setAnswerCRight(false);
    setAnswerDRight(false);
    setQuestaoId(null)
  }
  function goBack() {
    fullReset()
    resetQuestionAnswers()
    router.back()
  }
  return (
    <>
      <View className='flex-1'>
        <View className='flex-row px-2 pt-12 pb-6 justify-start items-center bg-blue-500 rounded-b-3xl'>
          <TouchableOpacity
            onPress={() => { resetQuestion(); resetQuiz(); router.back() }}
            className="h-10 w-10 items-center justify-center">
            <Icon name="chevron-left" size={32} color="#ffff" />
          </TouchableOpacity>
          <Text className='font-title text-2xl leading-tight text-white '>Inicio</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 24, margin: 0, width: '100%', gap: 16 }}>
          <View className='space-y-3'>
            <Text className='font-title text-2xl text-[#2A416F]'>
              Titulo do quiz
            </Text>
            <TextInput
              value={quiz.title}
              onChangeText={addTitle}
              className='w-fit px-4 mx-5 rounded-2xl border-4 border-blue-500 py-2'
              style={{
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                fontSize: 14,
                shadowRadius: 3.84,
                color: "black",
              }}
              textAlignVertical="center"
              placeholderTextColor="#888888"
              placeholder="titulo"
            />
          </View>
          <View>
            <Text className='font-title text-2xl text-[#2A416F] mb-3'>
              Tema & Nível
            </Text>
            <Select
              text='Escolha a Matéria'
              options={materiaOptions}
              onChangeSelect={(select) => addMateria(select)}
              OptionComponent={SelectOptions}
            />
            <Select
              text='Escolha o Nível'
              options={levelsOptions}
              onChangeSelect={(select) => addLevel(select)}
              OptionComponent={SelectOptions}
            />
          </View>
          <View className='gap-3'>
            <View className='flex-row justify-between items-center'>
              <Text className='font-title text-2xl text-[#2A416F]'>
                Questões
              </Text>
              <TouchableOpacity
                onPress={() => setModalQVisible(true)}>
                <Icon name='plus-circle' size={26} color={'#2A416F'} />
              </TouchableOpacity>
            </View>
            <View className='space-y-2'>
              {
                questions.map((item) =>
                  <View key={item.id} className={`flex-row justify-between items-center space-x-3 `}>
                    <TouchableOpacity
                      onPress={() => {
                        deleteQuestion(item.id)
                      }}
                    >
                      <Icon name='trash' size={26} color={'#2A416F'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        const q = questions.filter(question => question.id === item.id)
                        console.log(q[0].answers);
                        setQuestaoId(q[0].id)
                        setQuestao(q[0].title);
                        setAnswerA(q[0].answers[0].title);
                        setAnswerB(q[0].answers[1].title);
                        setAnswerC(q[0].answers[2].title);
                        setAnswerD(q[0].answers[3].title);
                        setAnswerARight(q[0].answers[0].isRight);
                        setAnswerBRight(q[0].answers[1].isRight);
                        setAnswerCRight(q[0].answers[2].isRight);
                        setAnswerDRight(q[0].answers[3].isRight);
                        setModalQVisible(true)
                      }}
                      className={`w-[290] border-2 flex-row justify-between items-center border-blue-500 px-2 py-3 rounded-2xl`}>
                      <Text className='w-[240]' numberOfLines={1}>{item.title}</Text>
                      <Icon name='chevron-right' size={26} color={"#4A92FF"} />
                    </TouchableOpacity>
                  </View>
                )
              }
            </View>

          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={adicionarQuiz}
        >
          <LinearGradient
            className="w-fit flex-row items-end justify-center rounded-lg bg-blue-500 py-4 mx-4 my-3"
            start={{ x: 0.1, y: 0.2 }}
            colors={['#FD746C', '#FE846A', '#FF9068']}
          >
            <Text className='text-white text-2xl'>
              Finalizar Quiz
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='fade'
        visible={modalQVisible}
        onRequestClose={() => {
          resetQuestionAnswers()
          setModalQVisible(false);
        }}
      >
        <SafeAreaView className='flex-1'>
          <View className='flex-row px-2 py-5 justify-start items-center bg-blue-500 rounded-b-3xl'>
            <TouchableOpacity
              onPress={() => {
                setQuestao('');
                setAnswerA('');
                setAnswerB('');
                setAnswerC('');
                setAnswerD('');
                setModalQVisible(false);
              }}
              className='h-10 w-10 items-center justify-center'
            >
              <Icon name='chevron-left' size={30} color={'#fff'} />
            </TouchableOpacity>
            <Text className='font-title text-center text-2xl leading-tight text-white '>
              {quiz.title}
            </Text>
          </View>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 24,margin: 0, width: '100%', gap: 26 }} className='flex-1'>
            <View className='gap-3'>
              <Text className='font-title text-2xl text-[#2A416F]'>
                Pergunta
              </Text>
              <TextInput
                value={questao}
                onChangeText={setQuestao}
                className='w-fit px-4 rounded-2xl text-xl border-4 border-blue-500 py-2'
                style={{
                  backgroundColor: "#fff",
                  marginBottom: 0,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
                textAlignVertical="center"
                textAlign='center'
                placeholderTextColor="#888888"
                placeholder="Titulo"
              />
            </View>
            <View>
              <Text className='font-title text-2xl text-[#2A416F]'>
                Alternativas
              </Text>
              <View className='gap-6'>
                <View>
                  <View className='flex-row justify-between items-center'>
                    <Text className='font-normal text-lg'>A.</Text>
                    <View className='flex-row justify-between items-center'>
                      <Text>Resposta Correta</Text>
                      <Switch
                        value={answerARight}
                        onValueChange={() => { setAnswerARight(true); setAnswerBRight(false); setAnswerCRight(false); setAnswerDRight(false) }}
                        trackColor={{ false: '#b4b6b7', true: '#7cfc00' }}
                        thumbColor={'#d9dcdd'}
                      />
                    </View>
                  </View>
                  <TextInput
                    value={answerA}
                    onChangeText={setAnswerA}
                    className='w-fit border-2 border-[#888] rounded-2xl'
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: 0,
                      paddingHorizontal: 18,
                      marginHorizontal: 12,
                      paddingVertical: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      fontSize: 17,
                      shadowRadius: 3.84,
                      color: "black",
                    }}
                    textAlignVertical="center"
                    placeholderTextColor="#888888"
                    placeholder="Insira uma Resposta"
                  />
                </View>
                <View>
                  <View className='flex-row justify-between items-center'>
                    <Text className='font-normal text-lg'>B.</Text>
                    <View className='flex-row justify-between items-center'>
                      <Text>Resposta Correta</Text>
                      <Switch
                        value={answerBRight}
                        onValueChange={() => { setAnswerARight(false); setAnswerBRight(true); setAnswerCRight(false); setAnswerDRight(false) }}
                        trackColor={{ false: '#b4b6b7', true: '#7cfc00' }}
                        thumbColor={'#d9dcdd'} />
                    </View>
                  </View>
                  <TextInput
                    value={answerB}
                    onChangeText={setAnswerB}
                    className='w-fit border-2 border-[#888] rounded-2xl'
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: 0,
                      paddingHorizontal: 18,
                      marginHorizontal: 12,
                      paddingVertical: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      fontSize: 17,
                      shadowRadius: 3.84,
                      color: "black",
                    }}
                    textAlignVertical="center"
                    placeholderTextColor="#888888"
                    placeholder="Insira uma Resposta"
                  />
                </View>
                <View>
                  <View className='flex-row justify-between items-center'>
                    <Text className='font-normal text-lg'>C.</Text>
                    <View className='flex-row justify-between items-center'>
                      <Text>Resposta Correta</Text>
                      <Switch
                        value={answerCRight}
                        onValueChange={() => { setAnswerARight(false); setAnswerBRight(false); setAnswerCRight(true); setAnswerDRight(false) }}
                        trackColor={{ false: '#b4b6b7', true: '#7cfc00' }}
                        thumbColor={'#d9dcdd'} />
                    </View>
                  </View>
                  <TextInput
                    value={answerC}
                    onChangeText={setAnswerC}
                    className='w-fit border-2 border-[#888] rounded-2xl'
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: 0,
                      paddingHorizontal: 18,
                      marginHorizontal: 12,
                      paddingVertical: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      fontSize: 17,
                      shadowRadius: 3.84,
                      color: "black",
                    }}
                    textAlignVertical="center"
                    placeholderTextColor="#888888"
                    placeholder="Insira uma Resposta"
                  />
                </View>
                <View>
                  <View className='flex-row justify-between items-center'>
                    <Text className='font-normal text-lg'>D.</Text>
                    <View className='flex-row justify-between items-center'>
                      <Text>Resposta Correta</Text>
                      <Switch
                        value={answerDRight}
                        onValueChange={() => { setAnswerARight(false); setAnswerBRight(false); setAnswerCRight(false); setAnswerDRight(true) }}
                        trackColor={{ false: '#b4b6b7', true: '#7cfc00' }}
                        thumbColor={'#d9dcdd'} />
                    </View>
                  </View>
                  <TextInput
                    value={answerD}
                    onChangeText={setAnswerD}
                    className='w-fit border-2 border-[#888] rounded-2xl'
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: 0,
                      paddingHorizontal: 18,
                      marginHorizontal: 12,
                      paddingVertical: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      fontSize: 17,
                      shadowRadius: 3.84,
                      color: "black",
                    }}
                    textAlignVertical="center"
                    placeholderTextColor="#888888"
                    placeholder="Insira uma Resposta"
                  />
                </View>
              </View>
</View>
          </ScrollView>

          <TouchableOpacity
            className="w-fit flex-row items-end justify-center rounded-lg bg-blue-500 py-4 mx-4 my-3"
            onPress={() => {
              if (!questao) return alert('Falta preencher o Titulo')
              if (!answerA || !answerB || !answerC || !answerD) return alert('Falta preencher as alternativas')
              deleteQuestion(questaoId)
              addQuestion({
                id: questaoId ? questaoId : String(uuid.v4()),
                title: questao,
                answers: [
                  { id: 'A', isRight: answerARight, title: answerA },
                  { id: 'B', isRight: answerBRight, title: answerB },
                  { id: 'C', isRight: answerCRight, title: answerC },
                  { id: 'D', isRight: answerDRight, title: answerD }
                ]
              })
              resetQuestionAnswers()
              setModalQVisible(false)
            }}
          >
            <Text className='text-white text-2xl'>
              Adicionar Questão
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
}
