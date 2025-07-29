import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";
import AntDesign from "@expo/vector-icons/AntDesign";

const NotificationItem = ({ item, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`bg-[#E9EBFC] dark:bg-[#2E2F36] p-3 rounded-[10px] flex-row items-center gap-4 ${
          !item?.read ? "border border-primary" : ""
        }`,
        {},
      ]}
    >
      {!item?.read ? (
        <AntDesign name="checkcircle" size={24} style={tw`text-primary`} />
      ) : (
        <AntDesign name="checkcircleo" size={24} style={tw`text-primary`} />
      )}
      <View style={tw`flex-1`}>
        <TextPrimary font="semi_bold" size={13} style={tw``}>
          {item?.type}:
        </TextPrimary>
        <TextPrimary>{item?.message}</TextPrimary>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({});
