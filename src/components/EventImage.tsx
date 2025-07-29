import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../utils/constants/images";
import tw from "twrnc";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants";
import moment from "moment";

const EventImage = ({ image, item }: any) => {
  return (
    <View
      style={tw`h-[213px] w-full flex-row rounded-l-[10px] overflow-hidden rounded-[20px]`}
    >
      <Image
        source={item?.image ? { uri: item?.image } : images.event_img}
        style={tw` h-full w-[55%]`}
        resizeMode="cover"
      />
      <View style={tw`bg-[#2E2F36] items-end justify-end w-[45%] px-2 py-5`}>
        <TextPrimary style={tw`text-white leading-[77px]`} size={55}>
          {moment(item?.startDate).format("Do")}
        </TextPrimary>
        <TextPrimary
          size={13}
          font="montserrat_semibold"
          style={tw`text-white`}
        >
          {moment(item?.startDate).format("MMMM")}  {moment(item?.startDate).format("YYYY")}
        </TextPrimary>
        <TextPrimary
          size={11}
          font="montserrat_medium"
          style={tw`text-white`}
          color={colors.gray_light}
        >
          {moment(item?.startDate).format("dddd")}
        </TextPrimary>
        <View style={tw`p-1 rounded-[5px] bg-[#1F1F1F] mt-8`}>
          <TextPrimary
            size={11}
            font="montserrat_medium"
            style={tw`text-white`}
          >
            {moment(item?.startDate).format("hh:mm A")} -{" "}
            {moment(item?.endDate).format("hh:mm A")}
          </TextPrimary>
        </View>
      </View>
    </View>
  );
};

export default EventImage;

const styles = StyleSheet.create({});
