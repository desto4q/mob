import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import tw from "../lib/tailwind";

type PageLoaderProps = {
  message?: string; // Optional loading message
  color?: string;   // Customize spinner color
  size?: "small" | "large"; // Customize spinner size
};

const SimpleLoader: React.FC<SimpleLoaderProps> = ({ message = "Loading...", color = "#000", size = "large" }) => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default SimpleLoader;
