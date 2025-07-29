import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import TextPrimary from "./texts/text";
import tw from "../lib/tailwind";

interface CardActionProps {
  icon: any;
  sideIcon: any;
  title: string;
  text: string;
  onPress?: () => void;
  //...more props as needed
}

const CardAction: FC<CardActionProps> = ({
  icon,
  sideIcon,
  title,
  text,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        tw`rounded-[10px] h-[132px] flex-row w-full bg-[#ebeaeafc] dark:bg-[#2E2F36] `,
      ]}
      onPress={onPress}
    >
      <View style={tw` px-5 py-5 justify-between flex-1`}>
        <Image
          source={icon}
          style={tw`w-[26px] h-[24px]`}
          resizeMode="contain"
        />
        <TextPrimary font="semi_bold" size={15}>
          {title}
        </TextPrimary>
        <TextPrimary
            size={12.5}
            style={tw`text-[#7B7B7B]`}
            color="#7B7B7B"
            lineHeight={14.8}
          >
            {text}
          </TextPrimary>
      </View>

      <Image source={sideIcon} style={tw`h-full w-6 ml-auto`} />
    </Pressable>
  );
};

export default CardAction;

const styles = StyleSheet.create({});
