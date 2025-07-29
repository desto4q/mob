import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { colors } from "../../utils/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import tw from "../../lib/tailwind";

interface IInputText {
  placeholder: string;
  style?: any;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  returnKeyType?: "go" | "next" | "search" | "send" | "none";
  onSubmitEditing?: (event: { nativeEvent: { text: string } }) => void;
  icon?: React.ReactNode;
  type?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "email-address"
    | "phone-pad"
    | "numeric"
    | "url"
    | "number-pad-2"
    | "decimal-pad-2"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url-scheme"
    | "number-pad-dot-as-separator"
    | "number-pad-with-dot";
}

const SearchInput: FC<IInputText> = (props) => {
  const {
    placeholder,
    icon,
    style,
    secureTextEntry,
    onChangeText,
    value,
    autoCapitalize,
    autoCorrect,
    returnKeyType,
    onSubmitEditing,
    keyboardType,
    type,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[tw`dark:bg-gray_dark bg-gray_light`, styles.inputContainer, style]}>
      {icon && (
        <Image
          source={typeof icon === "string" ? { uri: icon } : icon}
          resizeMode="contain"
          style={styles.icon}
        />
      )}

      <TextInput
        placeholder={placeholder ? placeholder : "Enter text"}
        style={[styles.inputText, tw``]}
        placeholderTextColor={colors.gray}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: colors.gray_light,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  inputText: {
    fontSize: 13,
    color: colors.gray_light,
    height: 50,
    flex: 1, // Allow TextInput to take up available space
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: colors.gray_light,
    objectFit: "contain",
  },
});
