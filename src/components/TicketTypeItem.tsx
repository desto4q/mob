import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import TextPrimary from "./texts/text";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

interface TicketTypeItemProps {
  label: string;
  isSelected: boolean;
  onPress: () => void; // Function to be called when the item is pressed
}

const TicketTypeItem: FC<TicketTypeItemProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        tw`flex-row justify-between items-center px-2 rounded-[10px] w-full h-10 border flex-1`,
        {
          backgroundColor: isSelected ? "#bf7fea2b" : "transparent",
          borderColor: isSelected ? "#BF7FEA" : "#999797",
        },
      ]}
    >
      <TextPrimary
        style={[
          tw``,
          {
            color: isSelected ? "#BF7FEA" : "#999797",
          },
        ]}
      >
        {label}
      </TextPrimary>
      {!isSelected ? (
        <Ionicons name="radio-button-off" size={20} color="#7D7C7C" />
      ) : (
        <Ionicons name="radio-button-on" size={20} color="#BF7FEA" />
      )}
    </Pressable>
  );
};

export default TicketTypeItem;

const styles = StyleSheet.create({});
