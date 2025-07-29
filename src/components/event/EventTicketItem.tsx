import {
  BackHandler,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { colors } from "../../utils/constants";
import TextPrimary from "../texts/text";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import images from "../../utils/constants/images";
import ImageComp from "../ImageComp";
import icons from "../../utils/constants/icons";
import { useColorScheme } from "nativewind";
import tw from "../../lib/tailwind";
import { formatDate } from "../../utils/helpers";
import moment from "moment";

interface ItemProps {
  image: ImageSourcePropType;
  onPress: () => void;
  item: any;
}

const EventTicketItem = ({ onPress, item }: ItemProps) => {
  const eventDetails = item?.event
  return (
    <Pressable
      style={[
        tw`dark:bg-gray_dark bg-light  rounded-[10px] h-[105px] gap-1 flex-row items-center justify-between pr-5`,
      ]}
      onPress={onPress}
    >
      <View style={tw`flex-row gap-4 h-full items-center  p-2`}>
        <Image
          source={{uri: eventDetails?.image}}
          resizeMode="cover"
          style={tw`h-full  w-[80px] rounded-[10px] `}
        />
        <View style={tw`gap-1 items-start py-3`}>
          <View style={tw`flex-row items-center gap-2 `}>
            <TextPrimary font="montserrat_medium" size={13} color="#fff">
              {eventDetails?.name}
            </TextPrimary>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <AntDesign
              name="clockcircleo"
              size={12}
              color={colors.gray_light}
            />
            <TextPrimary
              font="montserrat_regular"
              size={13}
              color={colors.gray_light}
            >
             {moment(eventDetails?.startDate).format("hh:mm A")} -{" "}
             {moment(eventDetails?.endDate).format("hh:mm A")}
            </TextPrimary>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <FontAwesome6 name="calendar" size={10} color={colors.gray_light} />
            <TextPrimary
              font="montserrat_regular"
              size={13}
              color={colors.gray_light}
            >
              {formatDate(eventDetails?.startDate)}
            </TextPrimary>
          </View>
          <View style={[tw`flex-row items-center gap-2 `]}>
            <ImageComp image={icons.ticket} size={12} />
            <TextPrimary
              font="montserrat_regular"
              size={13}
              color={colors.gray_light}
            >
              {eventDetails?.ticketType}
            </TextPrimary>
          </View>
        </View>
      </View>

      <View style={tw`border-l border-[#15171E] border-dashed`}>
        <Image source={images.qrcode} style={tw`h-[83px] w-[45px]`} />
      </View>
    </Pressable>
  );
};

export default EventTicketItem;

const styles = StyleSheet.create({});
