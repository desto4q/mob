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
  style?:any;
  onPress?:() => void;
}

const DrawerHomeIcon = ({
  icon,
  label,
  focused,
  height = 15,
  width = 15,
  tintColor = "#848484",
  showArrow = true,
  style,
  onPress,
}: DrawerProps) => {
  return (
    <View style={[tw`flex-row justify-between items-center  w-full`, style]}>
      <View style={tw`flex-row gap-3 items-center flex-1 `}>
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
        <TextPrimary size={15} font="medium">
          {label}
        </TextPrimary>
      </View>

      {showArrow && (
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#8D8C8C" />
      )}
    </View>
  );
};

export default DrawerHomeIcon;

const styles = StyleSheet.create({});
