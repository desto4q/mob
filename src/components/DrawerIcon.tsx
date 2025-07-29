import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import TextPrimary from "./texts/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "twrnc";

interface DrawerProps {
  focused?: boolean;
  icon: any;
  label: string;
  width?: number;
  height?: number;
  tintColor?: string;
  showArrow?: boolean;
  style?: any;
  onPress?: () => void;
}

const DrawerIcon = ({
  icon,
  label,
  focused,
  height = 15,
  width = 15,
  tintColor = "white",
  showArrow = true,
  style,
  onPress,
}: DrawerProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[tw`flex-row justify-between items-center  w-full`, style]}
    >
      <View style={tw`flex-row gap-3 items-center flex-1 `}>
        <View
          style={tw`w-[35px] h-[35px] bg-[#A324F2] justify-center items-center  rounded-lg `}
        >
          <Image
            source={icon}
            resizeMode="contain"
            style={[
              {
                width: width,
                height: height,
                tintColor: tintColor,
              },
              tw` `,
            ]}
          />
        </View>
        <TextPrimary size={15} font="medium">
          {label}
        </TextPrimary>
      </View>

      {showArrow && (
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#8D8C8C" />
      )}
    </Pressable>
  );
};

export default DrawerIcon;

const styles = StyleSheet.create({});
