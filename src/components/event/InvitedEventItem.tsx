import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/constants";
import TextPrimary from "../texts/text";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from "nativewind";
import tw from "../../lib/tailwind";

interface ItemProps {
  image: ImageSourcePropType;
  onPress: () => void;
}


const InvitedEventItem = ({ onPress, image }:ItemProps) => {
  return (
    <Pressable
      style={[tw` p-3  rounded-[10px] dark:bg-gray_dark bg-light`]}
      onPress={onPress}
    >
      <TextPrimary  font="montserrat_regular"  color={colors.gray_light} size={8} >Frank Rose invited you to...</TextPrimary>
      <View style={tw`gap-4 flex-row items-center justify-between`}>
      <View style={tw`flex-row gap-2 items-center`}>
        <Image
          source={image}
          resizeMode="cover"
          style={tw`h-[72px]  w-[68px] rounded-[10px] `}
        />
        <View style={tw`gap-[0.5px] items-start`}>
            <TextPrimary font="montserrat_medium" size={8} color="#3F6BB9">
              EDUCATION
            </TextPrimary>
          <View style={tw`flex-row items-center  `}>
            <TextPrimary font="montserrat_medium" size={13} color="#fff">
              Google UI Event
            </TextPrimary>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
          <AntDesign name="clockcircleo" size={12} color={colors.gray_light} />
            <TextPrimary
              font="montserrat_regular"
              size={13}
              color={colors.gray_light}
            >
              7:30 - 1:00PM
            </TextPrimary>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <FontAwesome6 name="calendar" size={10} color={colors.gray_light} />
            <TextPrimary
              font="montserrat_regular"
              size={13}
              color={colors.gray_light}
            >
             Free
            </TextPrimary>
          </View>
        </View>
      </View>

      <MaterialIcons name="arrow-forward-ios" style={tw`text-black dark:text-white`} size={15}  />

      </View>
    </Pressable>
  );
};

export default InvitedEventItem;

const styles = StyleSheet.create({});
