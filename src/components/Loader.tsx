import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";

type PageLoaderProps = {
  message?: string; // Optional loading message
  color?: string;   // Customize spinner color
  size?: "small" | "large"; // Customize spinner size
};

const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading...", color = "#000", size = "large" }) => {
  return (
    <View style={[styles.container, tw`dark:bg-gray_dark`]}>
      <ActivityIndicator size={size} color={color} />
      {message && <TextPrimary style={styles.message}>{message}</TextPrimary>}
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

export default PageLoader;
