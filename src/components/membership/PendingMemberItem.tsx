import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import TextPrimary from "../texts/text";
import SmallButton from "../buttons/SmallButton";
import images from "../../utils/constants/images";
import { formatDate } from "../../utils/helpers";

const PendingMemberItem = ({ onPress, image, item, designation, status, date }) => {
  return (
    <Pressable style={tw`gap-1 flex-row w-full p-1  `} onPress={onPress}>
      <View
        style={tw`flex-row  flex-1 items-center rounded-[10px]`}
      >
        <Image
          source={item.photo ? { uri: item.photo } : images.profileImg}
          resizeMode="cover"
          style={tw` h-[90px]  w-[91px] rounded-lg`}
        />

        <View style={tw`flex-col justify-between p-2 pb-3 w-full `}>
          <TextPrimary font="montserrat_medium" size={13} color="#3F6BB9">
            {item.companyName}
          </TextPrimary>
          <TextPrimary font="montserrat_medium" size={11} color="#000">
            {designation}
          </TextPrimary>
          <TextPrimary font="montserrat_regular" size={11} color="#636161" style={tw`mt-1`}>
            {formatDate(date)}
          </TextPrimary>


        </View>
      </View>

      <View style={[tw` items-start gap-1 mt-auto px-2 py-1 rounded-md`, { backgroundColor: status === "active" ? "#1E2F17" : status === "pending" ? "#43391C" : "#2F1717" }]}>

        <TextPrimary
          font="medium"
          size={12}
          style={[tw`leading-[12px] text-[#19A631]`, { color: status === "active" ? "#4CD964" : status === "pending" ? "#F9BF13" : "#F74D1B" }]}
          color="#19A631"
        >
          {status}
        </TextPrimary>
      </View>
    </Pressable>
  );
};

export default PendingMemberItem;

const styles = StyleSheet.create({});
