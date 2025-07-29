import React from "react";
import { View, Image, Platform } from "react-native";
import tw from "twrnc";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants/colors";

interface TabProps {
  focused: boolean;
  icon: any;
  label: string;
  width?: number;
  height?: number;
}

export const TabIcon = ({
  focused,
  icon,
  label,
  width = 19,
  height = 19,
}: TabProps) => {
  return (
    <View
      style={[
        tw`m-auto `,
        {
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: width,
          height: height,
          tintColor: focused ? colors.primary : "#848484",
        }}
      />
      <View style={[tw`mt-3`]}>
        <TextPrimary
          size={Platform.OS === "ios" ? 12 : 10}
          color={focused ? "#FFFFFF" : "#848484"}
          style={[tw`text-left`]}
          font="montserrat_medium"
          lineHeight={14}
        >
          {label}
        </TextPrimary>
      </View>
    </View>
  );
};
