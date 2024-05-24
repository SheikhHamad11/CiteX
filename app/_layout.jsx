import React from "react";
import { Stack, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import Header from "../components/Modal";
export default function _layout() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const Title = () => {
    return (
      <Image
        className=""
        source={require("../assets/images/logo.png")}
        style={{ height: 50, width: 100 }}
      />
    );
  };
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => <Title />,
          headerLeft: null,
          // headerLeft: () => (
          //   <View>

          //     <TouchableOpacity onPress={()=>router.back()}>

          //       <Icon name="less-than" size={18} color="#0274B3" />

          //     </TouchableOpacity>
          //   </View>
          // ),
          headerRight: () => (
            <View style={{ marginEnd: 20 }}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="ellipsis-v" size={30} color="#0274B3" />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Start"  />
        <Stack.Screen name="Result" />
        <Stack.Screen name="Categories" />
        <Stack.Screen name="Citation" />
      </Stack>
      <Header modalVisible={modalVisible} setModalVisible={setModalVisible} />
  
    </>
  );
}
