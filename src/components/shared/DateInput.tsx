import {
  Image,
  ImageSourcePropType,
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import TextPrimary from "../texts/text";
import { colors } from "../../utils/constants";
import tw from "../../lib/tailwind";

interface IInputText {
  placeholder?: string;
  style?: any;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  returnKeyType?: "go" | "next" | "search" | "send" | "none";
  onSubmitEditing?: (event: { nativeEvent: { text: string } }) => void;
  icon?: ImageSourcePropType;
  type?: string;
  label?: string;
  errorMessage?: any;
  onPress?: () => void;
  editable?: boolean;
}

export const DateInput: FC<IInputText> = (props) => {
  const {
    placeholder,
    icon,
    style,
    onChangeText,
    value,
    label,
    errorMessage,
    onPress,
    editable,
  } = props;

  return (
    <Pressable
      onPress={() => {
        !editable && onPress && onPress();
      }}
      style={[tw` `, style]}
    >
      {label && (
        <TextPrimary
          size={13}
          font="regular"
          color={colors.gray_light}
          style={{ marginBottom: 5 }}
        >
          {label}
        </TextPrimary>
      )}
      <View style={[tw`bg-[#E9EBFB] dark:bg-[#2E2F36]`, styles.inputContainer]}>
        {icon && (
          <Image
            source={typeof icon === "string" ? { uri: icon } : icon}
            resizeMode="contain"
            style={styles.icon}
          />
        )}
        <TextPrimary style={[styles.inputText, tw`dark:text-white`]}>
          {value === "Invalid date" || !value ? placeholder : value}
        </TextPrimary>
      </View>
      {errorMessage && (
        <TextPrimary style={tw`text-red-600`}>{errorMessage}</TextPrimary>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: colors.gray_light,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 50,
  },
  inputText: {
    fontSize: 13,
    color: colors.dark,
    alignItems: "center",
    flex: 1, // Allow TextInput to take up available space
  },
  icon: {
    width: 17,
    height: 17,
    objectFit: "contain",
  },
});
