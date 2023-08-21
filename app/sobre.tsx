import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function Sobre() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center">
      <View className="flex-row pt-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-8 w-12 items-center justify-center"
        >
          <Icon name="chevron-left" size={24} color="#2A416F" />
        </TouchableOpacity>
        <Text className="flex-1 font-semibold font-title text-2xl leading-tight text-[#2A416F]">
          Sobre
        </Text>
      </View>
      <ScrollView className="flex-1 px-8">
        <Text className="text-3xl font-semibold text-center text-[#2A416F] my-6">
          O Motivo do {"\n"}desenvolvimento?
        </Text>
        <View className="bg-[#0062FF] px-7 py-6 rounded-lg mb-14 relative w-full">
          <Text className="text-white text-lg font-light">
            O aplicativo foi inicialmente criado para a Semana Paulo Freire em
            2022 e posteriormente redesenhado em 2023, visando oferecer uma
            interface de usuário (UI) mais atrativa e uma experiência
            aprimorada. O propósito central do quiz é proporcionar suporte ao
            aluno na compreensão aprofundada das matérias, através de uma
            abordagem interativa e didática.
          </Text>
          <Image
            className="absolute p-10 top-[104%] left-[2px]"
            source={require("../src/assets/book.png")}
            style={{ width: 90, height: 100 }}
          />
        </View>
        <Text className="text-2xl text-[#2A416F] font-semibold text-center mb-6">
          Por Quem?
        </Text>
        <View className="flex-row justify-between pb-5">
          <View className="space-y-2 justify-center items-center">
            <Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/85580011?v=4",
              }}
              className="h-28 w-28 rounded-lg"
            />
            <View>
              <Text className="text-xl text-[#333333] font-medium">
                Gabriel B.
              </Text>
              <Text className="text-sm w-36 text-[#333333] font-medium">
                Desenvolvedor Full Stack.
                <Text className="text-sm text-blue-500 font-medium"> Web </Text>
                Designer
              </Text>
            </View>
            <View className="gap-2 flex-row mr-16">
              <View className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center">
                <Image
                  source={{
                    uri: "https://i.postimg.cc/J0RZC4LT/linked-in.png",
                  }}
                  className="h-2 w-2"
                />
              </View>
              <View className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center">
                <Image
                  source={{
                    uri: "https://i.postimg.cc/ZRnz769j/instagram.png",
                  }}
                  className="h-3 w-3"
                />
              </View>
              <View className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center">
                <Image
                  source={{
                    uri: "https://i.postimg.cc/15JTT8Qj/Group-9.png",
                  }}
                  className="h-3 w-3"
                />
              </View>
            </View>
          </View>
          <View className="space-y-2 justify-center items-center">
            <Image
              source={{
                uri: "https://instagram.fcgh23-1.fna.fbcdn.net/v/t51.2885-19/366023601_6675853295800089_7604792551801304264_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcgh23-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=_pyo_ULnVNIAX8vyAeh&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfABNGYoOq_ZNauhNPFLsVHJ0C4fHgqxy54ec7FlGzry_w&oe=64E83CB9&_nc_sid=8b3546",
              }}
              className="h-28 w-28 rounded-lg"
            />
            <View>
              <Text className="text-xl text-[#333333] font-medium">
                Kauã M.
              </Text>
              <Text className="text-sm  w-36 text-[#333333] font-medium">
                Desenvolvedor
                <Text className="text-sm text-blue-500 font-medium">
                  {" "}
                  Full Stack{" "}
                </Text>
                . Web Designer
              </Text>
            </View>
            <View className="gap-2 flex-row mr-16">
              <View className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center">
                <Image
                  source={{
                    uri: "https://i.postimg.cc/J0RZC4LT/linked-in.png",
                  }}
                  className="h-2 w-2"
                />
              </View>
              <View className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center">
                <Image
                  source={{
                    uri: "https://i.postimg.cc/ZRnz769j/instagram.png",
                  }}
                  className="h-3 w-3"
                />
              </View>
              <View className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center">
                <Image
                  source={{
                    uri: "https://i.postimg.cc/15JTT8Qj/Group-9.png",
                  }}
                  className="h-3 w-3"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
