import { useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/Feather'
import { ElementType, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Modal, SafeAreaView, FlatList, TextInput, Switch } from 'react-native';
import { useNewQuiz, useQuestionsStore, useQuizStore } from '../src/lib/store';
const { width } = Dimensions.get('window');
import uuid from 'react-native-uuid';

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

const Select = ({ options, onChangeSelect, text, label, OptionComponent }:
  {
    text: string,
    options: OptionsType[],
    onChangeSelect: (select: string) => void,
    label: string,
    OptionComponent: ElementType
  }) => {
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
    <View>
      <Text className='text-base pl-5 py-2 text-[#2A416F]'>{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className='h-[50px] flex-row justify-between items-center bg-[#f8f9fa] px-4 mx-5 rounded-lg border-2 border-blue-500'>
        <Text className={`text-base w-[${width - 90}]`} numberOfLines={1}>{txt}</Text>
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
    </View>
  )
}

export default function addQuiz() {
  const router = useRouter()
  const { addQuiz } = useQuizStore()
  const { questions, addQuestion, deleteQuestion, resetQuestion } = useQuestionsStore()
  const { quiz, addId, addLevel, addMateria, addQuestions, addTitle, resetQuiz } = useNewQuiz()
  const [modalQVisible, setModalQVisible] = useState(false);
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
        <ScrollView contentContainerStyle={{ padding: 12, margin: 0, width: '100%', gap: 16 }}>
          <View>
            <TextInput
              value={quiz.title}
              onChangeText={addTitle}
              className='w-fit'
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                marginBottom: 0,
                paddingHorizontal: 18,
                marginHorizontal: 12,
                paddingVertical: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                fontSize: 14,
                shadowRadius: 3.84,
                borderColor: "#4A92FF",
                borderWidth: 2,
                color: "black",
              }}
              textAlignVertical="center"
              placeholderTextColor="#888888"
              placeholder="titulo"
            />
            <Text className='font-title text-2xl text-[#2A416F]'>
              Tema & Nível
            </Text>
            <Select
              text='Selecione a Materia'
              options={materiaOptions}
              onChangeSelect={(select) => addMateria(select)}
              OptionComponent={SelectOptions}
              label='Matéria'
            />
            <Select
              text='Selecione o Nível'
              options={levelsOptions}
              onChangeSelect={(select) => addLevel(select)}
              OptionComponent={SelectOptions}
              label='Nível'
            />
          </View>
          <View>
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
                  <View key={item.id} className='w-fit mx-4 space-y-2'>
                    <View className='border-2 border-blue-500 px-2 py-3 w-full rounded-lg'>
                      <Text>{item.title}</Text>
                    </View>
                    {item.answers.map((answer) => <View className={`border-2  px-2 py-3 w-full rounded-lg ${answer.isRight ? 'border-green-500' : 'border-gray-500'}`}>
                      <Text>{answer.title}</Text>
                    </View>)}
                  </View>
                )
              }
            </View>

          </View>
        </ScrollView>
        <TouchableOpacity
          className="w-fit flex-row items-end justify-center rounded-lg bg-blue-500 py-4 mx-4 my-3"
          onPress={adicionarQuiz}
        >
          <Text className='text-white text-2xl'>
            Adicionar Quiz
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='fade'
        visible={modalQVisible}
        onRequestClose={() => {
          setQuestao('');
          setAnswerA('');
          setAnswerB('');
          setAnswerC('');
          setAnswerD('');
          setModalQVisible(false);
        }}
      >
        <SafeAreaView className='flex-1'>
          <View className=' flex-row items-center justify-between px-3 py-3 border-b-2 border-[#ddd]'>
            <TouchableOpacity
              onPress={() => {
                setQuestao('');
                setAnswerA('');
                setAnswerB('');
                setAnswerC('');
                setAnswerD('');
                setModalQVisible(false);
              }}
            >
              <Icon name='chevron-left' size={30} color={'#2A416F'} />
            </TouchableOpacity>
            <Text className='font-title text-lg text-[#2A416F]'>Questão</Text>
            <TouchableOpacity
              onPress={() => { resetQuestionAnswers(); setModalQVisible(false) }}
            >
              <Text className='text-sm font-bold text-[#2A416F]'>Cancela</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-1 justify-center space-y-4'>
            <TextInput
              value={questao}
              onChangeText={setQuestao}
              className='w-fit'
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                marginBottom: 0,
                paddingHorizontal: 18,
                marginHorizontal: 12,
                paddingVertical: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                fontSize: 14,
                shadowRadius: 3.84,
                borderColor: "#4A92FF",
                borderWidth: 2,
                color: "black",
              }}
              textAlignVertical="center"
              placeholderTextColor="#888888"
              placeholder="titulo"
            />
            <View>
              <View className='flex-row justify-between items-center'>
                <Text>Resposta A</Text>
                <View className='flex-row justify-between items-center'>
                  <Text>Resposta certa</Text>
                  <Switch
                    value={answerARight}
                    onValueChange={() => { setAnswerARight(true); setAnswerBRight(false); setAnswerCRight(false); setAnswerDRight(false) }}
                    trackColor={{ false: '#2A416F', true: '#00FFF0 ' }}
                    thumbColor={'#4A92FF'} />
                </View>
              </View>
              <TextInput
                value={answerA}
                onChangeText={setAnswerA}
                className='w-fit'
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  marginBottom: 0,
                  paddingHorizontal: 18,
                  marginHorizontal: 12,
                  paddingVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  fontSize: 14,
                  shadowRadius: 3.84,
                  borderColor: "#4A92FF",
                  borderWidth: 2,
                  color: "black",
                }}
                textAlignVertical="center"
                placeholderTextColor="#888888"
                placeholder="Resposta A"
              />
            </View>
            <View>
              <View className='flex-row justify-between items-center'>
                <Text>Resposta B</Text>
                <View className='flex-row justify-between items-center'>
                  <Text>Resposta certa</Text>
                  <Switch
                    value={answerBRight}
                    onValueChange={() => { setAnswerARight(false); setAnswerBRight(true); setAnswerCRight(false); setAnswerDRight(false) }}
                    trackColor={{ false: '#2A416F', true: '#00FFF0 ' }}
                    thumbColor={'#4A92FF'} />
                </View>
              </View>
              <TextInput
                value={answerB}
                onChangeText={setAnswerB}
                className='w-fit'
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  marginBottom: 0,
                  paddingHorizontal: 18,
                  marginHorizontal: 12,
                  paddingVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  fontSize: 14,
                  shadowRadius: 3.84,
                  borderColor: "#4A92FF",
                  borderWidth: 2,
                  color: "black",
                }}
                textAlignVertical="center"
                placeholderTextColor="#888888"
                placeholder="Resposta B"
              />
            </View>
            <View>
              <View className='flex-row justify-between items-center'>
                <Text>Resposta C</Text>
                <View className='flex-row justify-between items-center'>
                  <Text>Resposta certa</Text>
                  <Switch
                    value={answerCRight}
                    onValueChange={() => { setAnswerARight(false); setAnswerBRight(false); setAnswerCRight(true); setAnswerDRight(false) }}
                    trackColor={{ false: '#2A416F', true: '#00FFF0 ' }}
                    thumbColor={'#4A92FF'} />
                </View>
              </View>
              <TextInput
                value={answerC}
                onChangeText={setAnswerC}
                className='w-fit'
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  marginBottom: 0,
                  paddingHorizontal: 18,
                  marginHorizontal: 12,
                  paddingVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  fontSize: 14,
                  shadowRadius: 3.84,
                  borderColor: "#4A92FF",
                  borderWidth: 2,
                  color: "black",
                }}
                textAlignVertical="center"
                placeholderTextColor="#888888"
                placeholder="Resposta C"
              />
            </View>
            <View>
              <View className='flex-row justify-between items-center'>
                <Text>Resposta D</Text>
                <View className='flex-row justify-between items-center'>
                  <Text>Resposta certa</Text>
                  <Switch
                    value={answerDRight}
                    onValueChange={() => { setAnswerARight(false); setAnswerBRight(false); setAnswerCRight(false); setAnswerDRight(true) }}
                    trackColor={{ false: '#2A416F', true: '#00FFF0 ' }}
                    thumbColor={'#4A92FF'} />
                </View>
              </View>
              <TextInput
                value={answerD}
                onChangeText={setAnswerD}
                className='w-fit'
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  marginBottom: 0,
                  paddingHorizontal: 18,
                  marginHorizontal: 12,
                  paddingVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  fontSize: 14,
                  shadowRadius: 3.84,
                  borderColor: "#4A92FF",
                  borderWidth: 2,
                  color: "black",
                }}
                textAlignVertical="center"
                placeholderTextColor="#888888"
                placeholder="Resposta D"
              />
            </View>


          </View>

          <TouchableOpacity
            className="w-fit flex-row items-end justify-center rounded-lg bg-blue-500 py-4 mx-4 my-3"
            onPress={() => {
              addQuestion({
                id: String(uuid.v4()),
                title: questao,
                answers: [
                  { id: '1', isRight: answerARight, title: answerA },
                  { id: '2', isRight: answerBRight, title: answerB },
                  { id: '3', isRight: answerCRight, title: answerC },
                  { id: '4', isRight: answerDRight, title: answerD }
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
