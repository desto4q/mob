import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import TextPrimary from "../texts/text";
import SmallButton from "../buttons/SmallButton";

const PendingItem = ({ onPress, image }) => {
  return (
    <Pressable style={tw`gap-1 flex-row w-full p-1 `} onPress={onPress}>
      <View
        style={tw`flex-row  items-center rounded-[10px] overflow-hidden`}
      >
        <Image
          source={image}
          resizeMode="cover"
          style={tw` h-[90px]  w-[91px]`}
        />

        <View style={tw`flex-col justify-between p-2 pb-3 w-full `}>
          <TextPrimary font="montserrat_medium" size={8} color="#3F6BB9">
            EDUCATION
          </TextPrimary>
          <TextPrimary font="montserrat_medium" size={13} color="#000">
            Google UI Event
          </TextPrimary>
          <TextPrimary font="montserrat_regular" size={11} color="#636161" style={tw`mt-1`}>
            7:30 - 1:00PM
          </TextPrimary>

         
        </View>
      </View>

      {/* <View style={tw`flex-col items-start mt-3 gap-1 mt-auto`}>
        <TextPrimary
          font="medium"
          size={8}
          color={colors.gray_light}
          style={tw`leading-[12px]`}
        >
          status
        </TextPrimary>
        <TextPrimary
          font="medium"
          size={12}
          style={tw`leading-[12px]`}
          color="#19A631"
        >
          Approved
        </TextPrimary>
      </View> */}
    </Pressable>
  );
};

export default PendingItem;

const styles = StyleSheet.create({});
