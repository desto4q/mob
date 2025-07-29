import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants";
import tw from "../lib/tailwind";

const TabSelect = ({data}) => {
  const [tab, setTab] = useState(true);

  return (
    <View
      style={tw`px-[8px] py-[5px] flex-row flex-1 dark:bg-[${colors.gray_dark}] bg-light rounded-[20px]`}
    >
      <Pressable
        style={[
          tw` w-[50%] items-center rounded-[20px] py-2`,
          tab ? { backgroundColor: "#242EF2" } : {},
        ]}
        onPress={() => setTab(true)}
      >
        <TextPrimary style={[tw``, tab ? {color: "white"} : {}]}>{data[0]}</TextPrimary>
      </Pressable>
      <Pressable
        style={[
          tw` w-[50%] items-center rounded-[20px] py-2`,
          !tab ? { backgroundColor: "#242EF2" } : {},
        ]}
        onPress={() => setTab(false)}
      >
        <TextPrimary style={[tw``,!tab ? {color: "white"} : {}]}>{data[1]}</TextPrimary>
      </Pressable>
    </View>
  );
};

export default TabSelect;

const styles = StyleSheet.create({});
