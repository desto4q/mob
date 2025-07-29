import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";
import images from "../utils/constants/images";


interface ItemProps {
    image?: ImageSourcePropType;
    onPress?: () => void;
}

const SubscriptionLogItem = ({ onPress, image }:ItemProps) => {
  return (
    <Pressable style={tw`gap-1 flex-row w-full  justify-between dark:bg-gray_dark bg-light p-3 rounded-[10px]`} onPress={onPress}>
      <View
        style={tw`flex-row flex-1 gap-2  items-center rounded-[10px] overflow-hidden`}
      >
        <Image
          source={images.verifiers}
          resizeMode="cover"
          style={tw` h-[66px]  w-[66px] rounded-full`}
        />

        <View style={tw`flex-col justify-between   w-full `}>

          <TextPrimary color="#fff">
          Johnson Avi
          </TextPrimary>
          <TextPrimary font="montserrat_regular" size={11} color="#A6A6A6" style={tw`mt-1`}>
          testemail@gmail.com
          </TextPrimary>
          <TextPrimary font="montserrat_regular" size={11} color="#A6A6A6" style={tw`mt-1`}>
          Invited on 12-11-2024
          </TextPrimary>
         
        </View>
      </View>

      <View style={tw` items-start gap-1 mt-auto bg-[#1E2F17] px-2 py-1 rounded-md`}>
       
        <TextPrimary
          font="medium"
          size={12}
          style={tw`leading-[12px] text-[#19A631]`}
          color="#19A631"
        >
          Approved
        </TextPrimary>
      </View>
    </Pressable>
  );
};

export default SubscriptionLogItem;

const styles = StyleSheet.create({});
