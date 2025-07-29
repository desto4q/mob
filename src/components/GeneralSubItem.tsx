import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import TextPrimary from "./texts/text";
import Feather from "@expo/vector-icons/Feather";
import tw from "../lib/tailwind";

const GeneralSubItem = ({ item, onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw`flex-row justify-between bg-white dark:bg-[#2E2F36] bg-[#E9EBFC8A] shadow-sm p-3 py-4 rounded-[10px]`}
    >
      <TextPrimary>{item?.name}</TextPrimary>
      <TextPrimary style={tw` `}>
        {item?.duration} {item?.duration > 1 ? "months" : "month"}
      </TextPrimary>
      <TextPrimary>N{item?.amount}</TextPrimary>
      <Feather name="eye" size={20} style={tw`dark:text-white text-black`} />
    </Pressable>
  );
};

export default GeneralSubItem;

const styles = StyleSheet.create({});
