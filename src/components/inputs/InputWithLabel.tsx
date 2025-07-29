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
import { colors } from "../../utils/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import TextPrimary from "../texts/text";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
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
  onPress?: () => void;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  bodyStyle?: any;
  errorMessage?: any;
  disabled?: boolean;
}

const InputTextWithLabel: FC<IInputText> = (props) => {
  const {
    placeholder,
    icon,
    style,
    bodyStyle,
    secureTextEntry,
    onChangeText,
    value,
    autoCapitalize,
    autoCorrect,
    returnKeyType,
    onSubmitEditing,
    keyboardType,
    label,
    type,
    editable,
    onPress,
    errorMessage,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { mode: colorScheme } = useSelector((state: RootState) => state.user);

  return (
    <Pressable style={[tw``, bodyStyle]} onPress={onPress}>
      {label && (
        <TextPrimary
          size={13}
          font="medium"
          color={colors.gray_light}
          style={[{ marginBottom: 10 }, tw`text-gray_light`]}
        >
          {label}
        </TextPrimary>
      )}
      <View
        style={[styles.inputContainer, style, tw`dark:bg-gray_dark bg-light`]}
      >
        <TextInput
          placeholder={placeholder ? placeholder : ""}
          style={[styles.inputText, tw`text-black dark:text-white`]}
          placeholderTextColor={colors.gray}
          secureTextEntry={type === "password" && !isPasswordVisible} // Toggle visibility based on state
          onChangeText={onChangeText}
          value={value}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          returnKeyType={returnKeyType}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
        />

        {icon && (
          <Image
            source={typeof icon === "string" ? { uri: icon } : icon}
            resizeMode="contain"
            style={styles.icon}
          />
        )}
      </View>
      {errorMessage && (
        <TextPrimary style={tw`text-red-600`}>{errorMessage}</TextPrimary>
      )}
    </Pressable>
  );
};

export default InputTextWithLabel;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: colors.gray_light,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputText: {
    fontSize: 13,
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
