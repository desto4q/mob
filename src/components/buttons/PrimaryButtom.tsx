import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import TextPrimary from "../texts/text";
import { colors } from "../../utils/constants/colors";
import tw from "twrnc";

interface IButton {
  children: string;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  size?: number;
  icon?: any;
  loading?: boolean;
}

const PrimaryButton: FC<IButton> = ({
  children,
  style,
  onPress,
  color = colors.primary,
  loading = false,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress && onPress()}
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled ? "#333" : color },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size={"small"} color={"#fff"} />
      ) : (
        <Text style={[tw`dark:text-white text-white text-[13px]`]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 50,
  },
});
