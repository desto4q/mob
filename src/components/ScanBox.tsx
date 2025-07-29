import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../utils/constants/images";

import { colors } from "../utils/constants/colors";
import TextPrimary from "./texts/text";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import tw from "../lib/tailwind";

const ScanBox = ({label, onPress, style}:any) => {
  const { mode: colorScheme } = useSelector((state: RootState) => state.user);
  return (
    <Pressable
    onPress={onPress}
      style={[
        tw`px-2 py-6 items-center justify-center gap-2 rounded-[10px] dark:bg-gray_dark bg-light  `,
        style
      ]}
    >
      <Image
        source={images.upload}
        resizeMode="contain"
        style={tw`w-[50px] h-[36px]`}
      />
      <TextPrimary size={10} color={colors.gray_light} style={tw`text-center leading-3 text-gray`}>
      {label}
      </TextPrimary>
    </Pressable>
  );
};

export default ScanBox;

const styles = StyleSheet.create({});
