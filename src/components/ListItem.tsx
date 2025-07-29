import { Image, StyleSheet, View } from "react-native";
import React from "react";
import TextPrimary from "./texts/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../utils/constants";
import tw from "../lib/tailwind";

interface ListProps {
  icon: any;
  itemKey: string;
  value: string;
  width?: number;
  valueColor?: string;
  height?: number;
  tintColor?: string;
}

const ListItem = ({
  icon,
  itemKey,
  value,
  valueColor,
  height = 15,
  width = 15,
}: ListProps) => {
  return (
    <View style={tw`flex-row items-center  w-full`}>
      <View
        style={tw`w-[35px] h-[35px] justify-center items-center bg-[#3A3A3C] rounded-lg `}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: width,
            height: height,
            //   tintColor:  tintColor,
          }}
        />
      </View>
      <TextPrimary
        color={colors.gray_light}
        style={tw`text-gray_light`}
        size={15}
        font="medium"
      >
        &nbsp; {itemKey} : &nbsp;
      </TextPrimary>
      <TextPrimary
        size={15}
        style={[
          valueColor ? { color: valueColor, textTransform: "capitalize" } : {}, tw`flex-1`
        ]}
        font="medium"
      >
        {value}
      </TextPrimary>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
