import { Image, StyleSheet, View } from "react-native";
import React from "react";
import TextPrimary from "./texts/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "twrnc";

interface ListSmallProps {
  focused?: boolean;
  icon: any;
  width?: number;
  height?: number;
  tintColor?: string;
  showArrow: boolean;
  style?:any;
  children:React.ReactNode;
}

const ListItemSmall = ({
  icon,
  focused,
  height = 15,
  width = 15,
  tintColor = "#848484",
  showArrow = true,
  style,
  children
}: ListSmallProps) => {
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
        {children}
      </View>

      {showArrow && (
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#8D8C8C" />
      )}
    </View>
  );
};

export default ListItemSmall;

const styles = StyleSheet.create({});
