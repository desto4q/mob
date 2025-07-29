import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "../../utils/constants";
import TextPrimary from "../texts/text";
import PrimaryButton from "../buttons/PrimaryButtom";
import SmallButton from "../buttons/SmallButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import tw from "../../lib/tailwind";
import { formatDate } from "../../utils/helpers";
import moment from "moment";

interface ItemProps {
  onPress: () => void;
  item: any;
}

const EventItem = ({ onPress, item }: ItemProps) => {
  return (
    <Pressable
      style={tw`gap-1 flex-row w-full p-1 relative  `}
      onPress={onPress}
    >
      <View
        style={tw`flex-col flex-1 items-center rounded-[10px] overflow-hidden `}
      >
        <Image
          source={{ uri: item?.image }}
          resizeMode="cover"
          style={tw`w-full h-[90px]`}
        />

        <View
          style={[
            tw`flex-col justify-between p-2 pb-3 bg-[#2E2F36] w-full dark:bg-gray_dark bg-light`,
          ]}
        >
          <TextPrimary
            font="montserrat_medium"
            size={8}
            color="#3F6BB9"
            style={tw`uppercase`}
          >
            {item?.category?.name}
          </TextPrimary>
          <TextPrimary font="montserrat_medium" size={13}>
            {item?.name.slice(0, 17)}...
          </TextPrimary>

          <View style={tw`flex-row items-center gap-2 mt-1`}>
            <MaterialIcons name="event-note" size={17} color="#A6A6A6" />
            <TextPrimary
              font="montserrat_regular"
              size={11}
              color="#A6A6A6"
              style={tw``}
            >
              {formatDate(item?.startDate)}
            </TextPrimary>
          </View>
          <View style={tw`flex-row items-center gap-2 mt-1`}>
            <MaterialCommunityIcons
              name="ticket-confirmation"
              size={17}
              color="#A6A6A6"
            />
            <TextPrimary
              font="montserrat_regular"
              size={11}
              color="#A6A6A6"
              style={tw``}
            >
              {item?.ticketType}
            </TextPrimary>
          </View>

          <SmallButton
            onPress={onPress}
            style={tw`h-6 mt-3 bg-transparent border border-[#A324F2]`}
          >
            <TextPrimary
              size={9}
              color="#fff"
              style={tw`dark:text-white text-black z-50`}
            >
              See More Details
            </TextPrimary>
          </SmallButton>
        </View>
      </View>

      <View
        style={[
          tw`absolute left-3 top-3 bg-[#000000B2] rounded-[5px] p-1 px-2 flex-row items-center gap-1`,
        ]}
      >
        <MaterialIcons name="event-note" size={15} color="#fff" />
        <TextPrimary
          font="montserrat_semibold"
          size={10}
          style={tw`text-white`}
        >
          {moment(item?.startDate).format("Do")}{" "}
          {moment(item?.startDate).format("MMM")}
        </TextPrimary>
      </View>

      {/* <View style={tw`flex-col items-start mt-3 gap-1 mt-auto`}>
        <TextPrimary
          font="medium"
          size={8}
          color={colors.gray_light}
          style={tw`leading-[12px]`}
        >
          status
        </TextPrimary>
        <TextPrimary
          font="medium"
          size={12}
          style={tw`leading-[12px]`}
          color="#19A631"
        >
          Approved
        </TextPrimary>
      </View> */}
    </Pressable>
  );
};

export default EventItem;

const styles = StyleSheet.create({});
