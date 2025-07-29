import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import tw from "../lib/tailwind";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({}: any) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={navigation.goBack} style={tw`rounded-md p-2`}>
      <MaterialIcons
        name="arrow-back-ios-new"
        size={22}
        color="white"
        style={tw`dark:text-white text-black `}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
