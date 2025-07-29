import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../utils/constants/images";
import tw from "twrnc";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants";

const SubscriptionItem = ({ onPress, image }) => {
  return (
    <Pressable style={tw`gap-1 flex-row w-full p-1`} onPress={onPress}>
      <View style={tw`flex-row flex-1 gap-2 items-center`}>
        <Image
          source={image}
          resizeMode="contain"
          style={tw`w-full h-[80px]  w-[76px] rounded-lg`}
        />

        <View style={tw`flex-col justify-between `}>
          <View style={tw` items-start  gap-1`}>
            <TextPrimary font="medium" size={8} color={colors.gray_light}>
              Plan
            </TextPrimary>
            <TextPrimary font="medium" size={12} style={tw`leading-[12px]`}>
              Premium Plan
            </TextPrimary>
          </View>
          <View style={tw`flex-col items-start mt-3 gap-1`}>
            <TextPrimary
              font="medium"
              size={8}
              color={colors.gray_light}
              style={tw`leading-[12px]`}
            >
              valid for
            </TextPrimary>
            <TextPrimary font="medium" size={12} style={tw`leading-[12px]`}>
              1 month
            </TextPrimary>
          </View>
        </View>
      </View>

      <View style={tw`flex-col items-start mt-3 gap-1 mt-auto`}>
        <TextPrimary
          font="medium"
          size={8}
          color={colors.gray_light}
          style={tw`leading-[12px]`}
        >
          status
        </TextPrimary>
        <TextPrimary font="medium" size={12} style={tw`leading-[12px]`} color="#19A631">
         Active
        </TextPrimary>
      </View>
    </Pressable>
  );
};

export default SubscriptionItem;

const styles = StyleSheet.create({});
