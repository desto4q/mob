import { Pressable, View } from "react-native";
import React from "react";
import tw from "twrnc";
import TextPrimary from "./texts/text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useToggleMode } from "../utils/helpers";
import BaseText from "./BaseText";

const Theme = ({ onClose }: { onClose: () => any }) => {
  const { toggleColorMode, mode } = useToggleMode();

  console.warn(mode);
  return (
    <View
      style={tw`w-full flex-row dark:bg-gray_dark bg-light p-3 rounded-2xl  border border-gray-800/50 dark:border-gray-500 `}
    >
      <Pressable
        onPress={() => {
          if (mode !== "dark") {
            toggleColorMode();
            if (onClose) {
              onClose();
            }
          }
        }}
        style={[
          tw`flex-1 mx-1 px-2 py-2 flex-row items-center justify-center gap-3 rounded-xl transition-all`,
          mode === "dark" ? tw`bg-[#A324F2]  ` : tw`bg-gray-50`,
        ]}
      >
        <Ionicons
          name={mode === "dark" ? "moon" : "moon-outline"}
          size={22}
          color={mode === "dark" ? "white" : "#6B7280"}
        />
        <TextPrimary
          font="medium"
          style={
            mode === "dark"
              ? tw`text-white text-base`
              : tw`text-gray-600 dark:text-gray-300 text-base`
          }
        >
          Dark
        </TextPrimary>
      </Pressable>
      <Pressable
        onPress={() => {
          if (mode !== "light") {
            toggleColorMode();
            if (onClose) {
              onClose();
            }
          }
        }}
        style={[
          tw`flex-1 mx-1 px-2 py-2 flex-row items-center justify-center gap-3 rounded-xl transition-all`,
          mode === "light" ? tw`bg-[#A324F2] ` : tw`bg-transparent`,
        ]}
      >
        <Ionicons
          name={mode === "light" ? "sunny" : "sunny-outline"}
          size={22}
          color={mode === "light" ? "white" : "white"}
        />
        <BaseText
          style={
            mode === "light"
              ? tw`text-white font-medium text-base`
              : tw`text-gray-200 dark:text-gray-300 font-medium text-base`
          }
        >
          Light
        </BaseText>
      </Pressable>
    </View>
  );
};

export default Theme;
