import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Header from "./header";


const GradientText = ({ text }) => {
  return (
    <MaskedView
      maskElement={
        <Header
          style={{ backgroundColor: "transparent" }}
          size={26}
          
        >
          {text}
        </Header>
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#A01CF2", "#CC87F8"]}
      >
        <Header
          style={{ backgroundColor: "transparent", opacity: 0 }}
        size={26}
        >
          {text}
        </Header>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

const styles = StyleSheet.create({});
