import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { home } from "../assets";
import * as Animate from 'react-native-animatable'

const Home = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView className=" flex-1 relative bg-[#ffffff]">
      <View className="w-full justify-center items-center mt-10">
        <View className="flex-row justify-center">
          <Animate.Text animation="fadeInLeft" duration={800} className="text-3xl text-[#30374F] font-[InterB]">Task</Animate.Text>
          <Animate.Text  animation="fadeInRight" duration={800} className="text-3xl text-[#3a5577] font-[InterB]">Tracker</Animate.Text>
        </View>
        <Text className=" mt-2 text-xl text-[#5D6B98] font-[InterSb]">
          Master Your Tasks, Conquer Your Day!
        </Text>
      </View>
      {/* Gif Section */}
      <Animate.View animation="fadeInUp" duration={800} className="w-full justify-center items-center">
        <Image source={home} className="object-contain w-[500px] h-[500px]" />
      </Animate.View>

      <Animate.View animation="fadeInUp" duration={800} className="w-[93px] h-[93px] border-[#becbfc] rounded-full flex justify-center items-center  border-t-4  border-l-2 border-r-2 mx-auto">
        <Animate.View animation="pulse" iterationCount={Infinity}>
          <TouchableOpacity
            onPress={handlePress}
            className="w-20 h-20 flex justify-center items-center bg-[#becbfc]  rounded-full"
          >
            <Text className="font-[InterB] text-2xl text-[#30374F]">Go</Text>
          </TouchableOpacity>
        </Animate.View>
      </Animate.View>
    </SafeAreaView>
  );
};

export default Home;
