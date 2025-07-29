import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import images from "../../utils/constants/images";
import tw from "twrnc";
import TextPrimary from "../texts/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { height } from "../../utils/constants";

interface VerificationActionProps{
    title: string;
  text: string; 
  image:any;
  onPress?: () => void;  // function to call when button is pressed  // TODO: replace with navigation prop when implemented  // TODO: replace with navigation prop when implemented  // TODO: replace with navigation prop when implemented   // TODO: replace with navigation prop when implemented   // TODO: replace with navigation prop when implemented   // TODO: replace with navigation prop when implemented   // TODO: replace with navigation prop when implemented   // TODO: replace with navigation prop when implemented   // TODO: replace
}

const VerificationAction:FC<VerificationActionProps> = ({title, text, image, onPress}) => {
  return (
    <Pressable onPress={onPress} style={tw`flex-row items-center justify-between h-[90px] `}>
      <View style={tw`flex-row gap-3 items-center flex-1`}>
        <Image
          source={image}
          style={tw`w-[77px] h-[87px] rounded-[15px] `}
        />
        <View style={tw`w-[45%] gap-3`}> 
          <TextPrimary font="montserrat_semibold" size={14}>
            {title}
          </TextPrimary>
          <TextPrimary font="montserrat_medium" size={11} color="#9C9C9C">
            {text}
          </TextPrimary>
        </View>
      </View>

      <View style={tw`h-10 w-8 rounded-[10px] bg-[#464646] items-center justify-center`}>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#8D8C8C" />
      </View>
    </Pressable>
  );
};

export default VerificationAction;

const styles = StyleSheet.create({});
