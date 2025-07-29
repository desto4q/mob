import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import TextPrimary from "./texts/text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "twrnc";

interface ProfileProps {
  icon: any;
  label: string;
  width?: number;
  height?: number;
  onPress?:() => void;
}

const ProfileItem = ({ icon, label,  height=15, width = 15, onPress}: ProfileProps) => {
  return (
   <Pressable onPress={onPress} style={tw`border border-[#31364A] rounded-[7px] p-3`}>
     <View style={tw`flex-row justify-between items-center  w-full`}>
      <View style={tw`flex-row gap-3 items-center flex-1 `}>
        <View style={tw`w-[35px] h-[35px] justify-center items-center bg-[#3A3A3C] rounded-lg `}>
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

      <MaterialIcons name="keyboard-arrow-right" size={24} color="#8D8C8C" />
    </View>
   </Pressable>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({});
