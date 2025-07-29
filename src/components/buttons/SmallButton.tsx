import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import TextPrimary from "../texts/text";
import { colors } from "../../utils/constants/colors";
import tw from 'twrnc'

interface IButton {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  size?: number;
  icon?: any;
  isLoading?: boolean;
}

const SmallButton: FC<IButton> = ({ children, style, onPress, color = colors.primary, isLoading }) => {
  return (
    <Pressable onPress={onPress} style={[styles.buttonContainer, { backgroundColor: color }, style]}>
      {isLoading ? (
        <ActivityIndicator size={"small"} color={"#fff"} />
      ) : (
        <>
          {children}
        </>
      )}
    </Pressable>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
  },
});
