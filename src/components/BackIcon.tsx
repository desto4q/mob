import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useToggleMode } from "../utils/helpers";


const BackIcon = ({ onPress }: {onPress:() => void;}) => {
  // const { mode: colorScheme } = useSelector((state: RootState) => state.user);
  const {mode:colorScheme, toggleColorMode} = useToggleMode();
  return (
    <Pressable onPress={onPress}>
      <MaterialIcons
        name="arrow-back-ios-new"
        size={22}
        color={colorScheme === "dark" ? "#fff" : "#2E2F36"}
      />
    </Pressable>
  );
};

export default BackIcon;

const styles = StyleSheet.create({});
