import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";
import PrimaryButton from "./buttons/PrimaryButtom";

type ErrorScreenProps = {
  message?: string; // Optional loading message
  color?: string; // Customize spinner color
  size?: "small" | "large"; // Customize spinner size
  onClose?:() => void;
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message = "Loading...",
  color = "#000",
  size = "large",
  onClose
}) => {
  return (
    <View style={[styles.container, tw`dark:bg-gray_dark`]}>
      {/* <ActivityIndicator size={size} color={color} /> */}
      <TextPrimary size={40} lineHeight={100}> ❌</TextPrimary>
      {message && <TextPrimary style={styles.message}>{message}</TextPrimary>}
      <PrimaryButton style={tw`w-3/4 mt-5`} onPress={onClose}>Close</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional semi-transparent background
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default ErrorScreen;
