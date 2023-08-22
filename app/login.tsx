import { useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// import Icon from "@expo/vector-icons/Feather";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  function handleLogin() {
    router.push("base")
  }

  return (
    <View className="flex-1 items-center px-10 py-40 justify-around">
      <View className="pb-60">
        <Image
          source={require("../src/assets/FallGirl.png")}
          style={{ width: 800, height: 550 }}
        />
      </View>

      <View className="w-full py-60 pb-60">
        <View className="pb-7 w-full">
          <Text className="font-title font-semibold text-[#2A416F] text-[30px] leading-tight">
            Olá,
          </Text>
          <Text className="font-title font-semibold text-[#2A416F] text-[30px]  leading-tight">
            Hora do Cadastro!
          </Text>
        </View>

        <View className="gap-2 w-full">
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: isEmailFocused ? "#fff" : "#EFEFEF",
              borderRadius: 20,
              marginBottom: 0,
              padding: 18,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              fontSize: 19,
              shadowRadius: 3.84,
              width: "100%",
              borderColor: isEmailFocused ? "#4A92FF" : "transparent",
              borderWidth: isEmailFocused ? 2 : 0,
              color: isEmailFocused ? "black" : "gray",
            }}
            textAlignVertical="top"
            placeholderTextColor="#888888"
            placeholder="Email"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
          <View className="relatie w-full">
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={{
                backgroundColor: isPasswordFocused ? "#fff" : "#EFEFEF",
                borderRadius: 20,
                marginBottom: 15,
                padding: 18,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                fontSize: 19,
                shadowRadius: 3.84,
                width: "100%",
                borderColor: isPasswordFocused ? "#4A92FF" : "transparent",
                borderWidth: isPasswordFocused ? 2 : 0,
                color: isPasswordFocused ? "black" : "gray",
              }}
              textAlignVertical="top"
              placeholderTextColor="#888888"
              placeholder="Senha"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <View className="absolute nset-y-0 left-0 flex items-center pl-2">
              {/* <Icon name="eye" size={16} color="#888888" /> */}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="w-full items-center justify-center rounded-[20px] bg-[#4A92FF] py-4"
          >
            <Text className="text-white font-medium text-[21px]">Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex w-[full] items-center rounded-lg py-4">
            <View className="flex items-center flex-row">
              <Image
                source={require("../src/assets/google.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text className="text-[#757575] text-lg ml-2">
                Entrar Com Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
