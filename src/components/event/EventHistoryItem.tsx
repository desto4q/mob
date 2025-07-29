import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";
import ImageComp from "../ImageComp";
import icons from "../../utils/constants/icons";

const EventHistoryItem = () => {
  return (
    <Pressable style={tw`flex-row gap-4 border-t border-[#3A3A3C] pt-3 `}>
      <View>
        <TextPrimary
          style={tw`font-light leading-7 dark:text-gray_light`}
          size={22}
        >
          22
        </TextPrimary>
        <TextPrimary font="montserrat_medium" style={tw``} size={10}>
          Aug
        </TextPrimary>
        <TextPrimary
          font="montserrat_regular"
          style={tw`dark:text-gray_light`}
          size={9}
        >
          Mon
        </TextPrimary>
      </View>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between  `}>
          <TextPrimary
            font="montserrat_regular"
            style={tw`dark:text-gray_light`}
            size={9}
          >
            7:30 - 10:00 PM
          </TextPrimary>
          <View
            style={tw` items-start gap-1 mt-auto bg-[#1E2F17] px-2 py-1 rounded-md`}
          >
            <TextPrimary
              font="medium"
              size={12}
              style={tw`leading-[12px] text-[#19A631]`}
              color="#19A631"
            >
              Approved
            </TextPrimary>
          </View>
        </View>
        <View style={tw`w-10/12 gap-2`}>
          <TextPrimary font="montserrat_medium" style={tw``}>
            The Xperience Concert
          </TextPrimary>
          <View style={tw`flex-row gap-1`}>
            <ImageComp image={icons.location} size={13} />
            <TextPrimary
              font="montserrat_regular"
              style={tw`dark:text-gray_light leading-4 -mt-[3px]`}
              size={10}
            >
              7 Ikoyi Plaza, Admiralty street, Exit bus-stop, Lagos State
            </TextPrimary>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default EventHistoryItem;

const styles = StyleSheet.create({});
