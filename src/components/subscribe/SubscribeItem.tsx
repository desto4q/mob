import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TextPrimary from "../texts/text";
import images from "../../utils/constants/images";
import { colors } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function SubscribeItem({
  item,
  designation,
}: {
  [key: string]: any;
}) {
  let nav = useNavigation();
  const onPress = () => {
    nav.navigate("SubscribeDetails", { item: item });
  };
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
}

const styles = StyleSheet.create({});
