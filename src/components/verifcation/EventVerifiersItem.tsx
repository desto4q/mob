import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils/constants";
import TextPrimary from "../texts/text";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "../../lib/tailwind";
import images from "../../utils/constants/images";

const EventVerifiersItem = ({ toggleModal, item }) => {
  console.log("verifiers", item);
  const status = item?.status;
  return (
    <Pressable
      style={tw`gap-4  items-center  p-3  py-6 dark:bg-[#2E2F36] bg-light  rounded-[20px] relative flex-grow`}
    >
      <View style={tw`flex-col gap-2 items-center`}>
        <Image
          source={{ uri: item?.user?.photo }}
          resizeMode="cover"
          style={tw`h-[66px]  w-[66px] rounded-full ]`}
        />
        <View style={tw`gap-1 items-center`}>
          <TextPrimary font="semi_bold" style={tw`text-center`} size={14}>
            {item?.user?.firstName} {item?.user?.lastName}
          </TextPrimary>

          <TextPrimary font="semi_bold" size={11} color="#696767">
            {item?.user?.email}
          </TextPrimary>

          <View
            style={[
              tw` items-start gap-1 mt-auto px-2 py-1 rounded-md`,
              {
                backgroundColor:
                  status === "active"
                    ? "#1E2F17"
                    : status === "pending"
                    ? "#43391C"
                    : "#2F1717",
              },
            ]}
          >
            <TextPrimary
              font="medium"
              size={12}
              style={[
                tw`leading-[12px] capitalize text-[#19A631]`,
                {
                  color:
                    status === "active"
                      ? "#4CD964"
                      : status === "pending"
                      ? "#F9BF13"
                      : "#F74D1B",
                },
              ]}
              color="#19A631"
            >
              {status}
            </TextPrimary>
          </View>
        </View>
      </View>
      <Ionicons
        onPress={() => {
          toggleModal(item);
        }}
        name="ellipsis-vertical"
        size={22}
        color="#C4C4C4"
        style={tw`absolute top-5 right-2`}
      />
    </Pressable>
  );
};

export default EventVerifiersItem;

const styles = StyleSheet.create({});
