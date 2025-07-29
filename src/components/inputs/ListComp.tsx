import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../utils/constants/colors";
import TextPrimary from "../texts/text";
import tw from 'twrnc'

interface ListcompProps {
  text: string;
  func: (text: string) => void;
}

export const Listcomp: React.FC<ListcompProps> = ({ text, func }) => {
  return (
    <TouchableOpacity
      onPress={() => func(text)}
      style={styles.listItem}
    >
      <View style={[styles.dot, tw`dark:border-[#EEEEEE]`]} />
      <TextPrimary color="#EEEEEE" size={12}>{text}</TextPrimary>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth:1,
    marginLeft: 10,
    marginRight: 10,
  },
  
});
