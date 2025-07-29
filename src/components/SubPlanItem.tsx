import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "../lib/tailwind";

const SubPlanItem = () => {
  return (
    <View style={tw`flex-row dark:bg-[${colors.gray_dark}] bg-light border border-[${colors.primary}] rounded-[10px] p-4`}>
      <View style={tw`flex-1 gap-2`}>
        <TextPrimary size={10} style={tw`uppercase`}>Premium</TextPrimary>
        <TextPrimary size={14} font="semi_bold">
          N 5,000/1 month
        </TextPrimary>
        <View style={[tw`bg-[#075632] px-[10px] py-[6px] rounded-[5px]`, { alignSelf: 'flex-start' }]}>
          <TextPrimary color="#10CB26" size={9} font="semi_bold" style={tw`dark:text-white text-white`}>
            {" "}
            1 Week Free Trial
          </TextPrimary>
        </View>
        <TextPrimary size={12} color={colors.gray_light}>
          Limited customization and control...
        </TextPrimary>
      </View>

      <Ionicons name="radio-button-on" size={25} color={colors.primary} />
    </View>
  );
};

export default SubPlanItem;

const styles = StyleSheet.create({});
