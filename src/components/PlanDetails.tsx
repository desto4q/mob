import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import TextPrimary from "./texts/text";

import Feather from "@expo/vector-icons/Feather";
import images from "../utils/constants/images";
import tw from "../lib/tailwind";

const PlanDetails = () => {
  return (
    <LinearGradient
      colors={["#8419C7", "#400C61"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={tw`rounded-[10px] p-5 gap-2 relative`}
    >
      <TextPrimary style={tw`text-white`} font="bold" size={20}>
        N5,000/ <TextPrimary size={20} style={tw`text-white`}>1 month</TextPrimary>
      </TextPrimary>
      <TextPrimary style={tw`text-white`} font="bold" size={14}>
        Premium Plan
      </TextPrimary>
      <TextPrimary style={tw`text-white`} size={11} font="medium">
        Enjoy complete access to Attach features{" "}
      </TextPrimary>
      <View style={tw`bg-white rounded-[10px] p-3 mt-3`}>
        <TextPrimary color="#504F4F">This plan gets</TextPrimary>
        <View style={tw`gap-3 mt-2`}>
          <View style={tw`flex-row items-center gap-2`}>
            <View
              style={tw`bg-[#C4D9FF] rounded-full h-6 w-6 items-center justify-center`}
            >
              <Feather name="check" size={15} color="#205DC8" />
            </View>
            <TextPrimary size={10} color="#504F4F" font="medium">
              This plan gets
            </TextPrimary>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <View
              style={tw`bg-[#C4D9FF] rounded-full h-6 w-6 items-center justify-center`}
            >
              <Feather name="check" size={15} color="#205DC8" />
            </View>
            <TextPrimary size={10} color="#504F4F" font="medium">
              Priority Support{" "}
            </TextPrimary>
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <View
              style={tw`bg-[#C4D9FF] rounded-full h-6 w-6 items-center justify-center`}
            >
              <Feather name="check" size={15} color="#205DC8" />
            </View>
            <TextPrimary size={10} color="#504F4F" font="medium">
            Unlimited User Accessibility
            </TextPrimary>
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <View
              style={tw`bg-[#C4D9FF] rounded-full h-6 w-6 items-center justify-center`}
            >
              <Feather name="check" size={15} color="#205DC8" />
            </View>
            <TextPrimary size={10} color="#504F4F" font="medium">
            Costomizable Reports
            </TextPrimary>
          </View>
        </View>
      </View>

      <Image source={images.checkout_layer} resize="contain" style={tw`absolute top-3  right-3 w-[140px] h-[100px]`}/>
    </LinearGradient>
  );
};

export default PlanDetails;

const styles = StyleSheet.create({});
