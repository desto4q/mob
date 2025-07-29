import { Image, ImageProps, StyleSheet, TextInput, View } from "react-native";
import React, { FC } from "react";
import { colors } from "../../utils/constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";

interface IInputText {
  placeholder: string;
  style?: any;
  onChangeText?: (text: string) => void;
  value?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  returnKeyType?: "go" | "next" | "search" | "send" | "none";
  onSubmitEditing?: (event: { nativeEvent: { text: string } }) => void;
  icon?: ImageProps;
  errorMessage?: any;
  label?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "email-address"
    | "phone-pad"
    | "numeric"
    | "url";
}

const Textarea: FC<IInputText> = (props) => {
  const {
    placeholder,
    icon,
    style,
    onChangeText,
    value,
    autoCapitalize,
    autoCorrect,
    returnKeyType,
    onSubmitEditing,
    keyboardType,
    errorMessage,
    label,
  } = props;

  const { mode: colorScheme } = useSelector((state: RootState) => state.user);

  return (
    <View style={tw``}>
      {label && (
        <TextPrimary
          size={13}
          font="medium"
          color={colors.gray_light}
          style={[{ marginBottom: 10 }, tw` text-gray_light`]}
        >
          {label}
        </TextPrimary>
      )}
      <View
        style={[styles.inputContainer, style, tw`bg-light dark:bg-gray_dark`]}
      >
        {icon && (
          <Image
            source={typeof icon === "string" ? { uri: icon } : icon}
            resizeMode="contain"
            style={styles.icon}
          />
        )}

        <TextInput
          placeholder={placeholder ? placeholder : "Enter text"}
          style={[styles.inputText, tw`text-black dark:text-white`]}
          placeholderTextColor={colors.gray}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          multiline={true} // Enables text wrapping and multiline input
          textAlignVertical="top" // Aligns text to the top
        />
      </View>
      {errorMessage && (
        <TextPrimary style={tw`text-red-600`}>{errorMessage}</TextPrimary>
      )}
    </View>
  );
};

export default Textarea;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: colors.gray_light,
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the top
    padding: 10,
    gap: 10,
  },
  inputText: {
    fontSize: 13,
    flex: 1, // Allow TextInput to take up available space
    height: 93, // Ensures the input has some initial height
    // Optional: limit the max height if needed
    textAlignVertical: "top", // Ensures the text starts at the top
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: colors.gray_light,
    objectFit: "contain",
    marginTop: 3, // Adjust as necessary to align with placeholder
  },
});
