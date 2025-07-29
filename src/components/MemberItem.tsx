import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../utils/constants/images";
import tw from "twrnc";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MemberItem = ({ onPress, item, designation }) => {
  return (
    <Pressable style={tw`gap-1 w-[151px] items-start`} onPress={onPress}>
      <Image
        source={item?.photo ? { uri: item?.photo } : images.profileImg}
        resizeMode="cover"
        style={tw`w-full h-[89px] rounded-lg`}
      />
      <TextPrimary font="medium" size={12}>
        {item?.companyName}
      </TextPrimary>
      <TextPrimary font="medium" size={10} color={colors.gray_light}>
        {item?.companyEmail}
      </TextPrimary>
      {designation && (
        <View style={tw`flex-row items-center gap-1`}>
          <FontAwesome6 name="user-large" size={10} color={colors.gray_light} />
          <TextPrimary font="medium" size={10} color={colors.gray_light}>
            {designation}
          </TextPrimary>
        </View>
      )}
    </Pressable>
  );
};

export default MemberItem;

const styles = StyleSheet.create({});
