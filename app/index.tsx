import { Link } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "@expo/vector-icons/Feather";

export default function App() {
  return (
    <View className="flex-1 items-center px-6 py-0 justify-around">
      <View className="flex justify-center items-center pr-14">
        <Image
          className=""
          source={require("../src/assets/PhoneGirl.png")}
          style={{ width: 600, height: 700 }}
        />
      </View>
      <View className="items-center w-full gap-3 pb-40">
        <Text className="text-center font-title text-[27px] leading-tight font-semibold text-[#2A416F] py-3">
          Hora de começar a se {"\n"} aventurar no aprendizado!
        </Text>
        <Link href="/login" asChild>
          <TouchableOpacity className="w-full items-center justify-center rounded-[20px] bg-[#4A92FF] py-4">
            <Text className="text-white font-medium text-lg">Começar</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/sobre" asChild>
          <TouchableOpacity className="w-full items-center justify-center rounded-lg py-2">
            <Text className="text-[#2A416F] text-lg">Sobre Nós</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
