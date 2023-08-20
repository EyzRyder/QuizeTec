import { useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/Feather'
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Modal, SafeAreaView, FlatList } from 'react-native';
const { width } = Dimensions.get('window');
interface OptionsType{
  id: string
  nome: string
}


const levelsOptions: OptionsType[] = [
  {
    id: '1',
    nome:"1"
  },
  {
    id: '2',
    nome:"2"
  },
  {
    id: '3',
    nome:"3"
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

const Select = ({ options, onChangeSelect, text,label }:
  {
    text: string,
    options: OptionsType[],
    onChangeSelect: (id: string) => void,
    label:string
  }) => {
  const [txt, setTxt] = useState(text);
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  function renderOption(item: OptionsType) {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
          onChangeSelect(item.id)
          setSelected(item.id)
          setTxt(item.nome)
        }}
        className={`flex-row items-center justify-between border-b-2 border-[#ddd] p-3 ${item.id === selected && 'bg-slate-200'}`}
      >
        <Text className='text-sm text-[#555]'>
          {item.nome}
        </Text>
        {item.id === selected && <Icon name='check' size={26} color={'green'} />}
      </TouchableOpacity>
    )
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

  return (
    <View className='flex-1'>
      <View className='flex-row px-2 pt-12 pb-6 justify-start items-center bg-blue-500 rounded-b-3xl'>
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center">
          <Icon name="chevron-left" size={32} color="#ffff" />
        </TouchableOpacity>
        <Text className='font-title text-2xl leading-tight text-white '>Inicio</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 12, margin: 0, width: '100%' }}>
        <Text className='font-title text-2xl text-[#2A416F]'>
          Tema & Nível
        </Text>
        <Select
          text='Selecione a Materia'
          options={materiaOptions}
          onChangeSelect={(id) => console.log(id)}
          label='Matéria'
        />
        <Select
          text='Selecione o Nível'
          options={levelsOptions}
          onChangeSelect={(id) => console.log(id)}
          label='Nível'
        />

        <Text className='font-title text-2xl text-[#2A416F]'>
          Questões & Alternativas
        </Text>
      </ScrollView>
    </View>
  );
}
