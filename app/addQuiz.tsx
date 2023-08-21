import { useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/Feather'
import { ElementType, ReactNode, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Modal, SafeAreaView, FlatList, TextInput } from 'react-native';
import { useNewQuiz, useQuizStore } from '../src/lib/store';
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
  const { quiz, addId, addLevel, addMateria, addQuestionsId, addTitle, resetQuiz } = useNewQuiz()

  function adicionarQuiz() {
    addQuiz({ ...quiz, id: String(uuid.v4()), QuestionsId: String(uuid.v4()) })
    resetQuiz()
    router.back()
  }
  return (
    <View className='flex-1'>
      <View className='flex-row px-2 pt-12 pb-6 justify-start items-center bg-blue-500 rounded-b-3xl'>
        <TouchableOpacity
          onPress={() => { resetQuiz(); router.back()}}
          className="h-10 w-10 items-center justify-center">
          <Icon name="chevron-left" size={32} color="#ffff" />
        </TouchableOpacity>
        <Text className='font-title text-2xl leading-tight text-white '>Inicio</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 12, margin: 0, width: '100%', gap: 16 }}>
        <View>
          <Text>{quiz.level}</Text>
          <Text>Titulo</Text>
          <TextInput value={quiz.title} onChangeText={addTitle} />
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

        <View className='flex-1'>
          <View className='flex-row justify-between items-center'>
            <Text className='font-title text-2xl text-[#2A416F]'>
              Questões
            </Text>
            <TouchableOpacity>
              <Icon name='plus-circle' size={26} color={'#2A416F'} />
            </TouchableOpacity>
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
  );
}
