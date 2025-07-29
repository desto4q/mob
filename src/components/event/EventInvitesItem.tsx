import {
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
import { useColorScheme } from "nativewind";
import SmallButton from "../buttons/SmallButton";
import tw from "../../lib/tailwind";
import images from "../../utils/constants/images";
import ImageComp from "../ImageComp";
import icons from "../../utils/constants/icons";
import moment from "moment";

interface ItemProps {
  item?:any
  navigation?: any;
  handleAccept: (item: any) => void;
  handleDecline: (item: any) => void;
  isAccepting: boolean;
  isDeclining: boolean;
}

const EventInvitesItem = ({
  item,
  handleAccept,
  isAccepting,
  isDeclining,
  handleDecline,
}: ItemProps) => {
  return (
    <View style={[tw` p-3  rounded-[10px] dark:bg-gray_dark bg-light`]}>
      <View style={tw`flex-row items-center gap-1`}>
        <Image
          source={images.avatar}
          resizeMode="cover"
          style={tw`h-[15px] w-[15px] rounded-full`}
        />
        <TextPrimary
          font="montserrat_regular"
          color={colors.gray_light}
          size={8}
        >
          Frank Rose invited you to...
        </TextPrimary>
        <ImageComp image={icons.flower} size={22} style={tw`ml-auto`} />
      </View>
      <View style={tw`gap-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row gap-2 items-center`}>
          <Image
            source={{ uri: item?.event?.image }}
            resizeMode="cover"
            style={tw`h-[72px]  w-[68px] rounded-[10px] `}
          />
          <View style={tw`gap-[0.5px] items-start`}>
            <TextPrimary font="montserrat_medium" size={8} color="#3F6BB9">
              EDUCATION
            </TextPrimary>
            <View style={tw`flex-row items-center  `}>
              <TextPrimary font="montserrat_medium" size={13} color="#fff">
                {item?.event?.name}
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
                {moment(item?.event?.startDate).format("hh:mm A")} -{" "}
                {moment(item?.event?.endDate).format("hh:mm A")}
              </TextPrimary>
            </View>
            <View style={tw`flex-row items-center gap-2 `}>
              <FontAwesome6
                name="calendar"
                size={10}
                color={colors.gray_light}
              />
              <TextPrimary
                font="montserrat_regular"
                size={13}
                color={colors.gray_light}
              >
                {item?.event?.ticketType}
              </TextPrimary>
            </View>
          </View>
        </View>
        <View style={tw``}>
          <MaterialIcons
            name="arrow-forward-ios"
            size={15}
            style={tw`text-black dark:text-white`}
          />
        </View>
      </View>
      <View style={tw`flex-row gap-4 pt-4 border-t border-gray_light mt-4`}>
        <SmallButton style={tw`h-7 bg-transparent border border-red-600`} 
         onPress={() => handleDecline(item)}
         isLoading={isDeclining}>
          <TextPrimary
            size={9}
            font="montserrat_medium"
            style={tw`text-red-600`}
          >
            Decline
          </TextPrimary>
        </SmallButton>
        <SmallButton
          style={tw`h-7 `}
          onPress={() => handleAccept(item)}
          isLoading={isAccepting}
        >
          <TextPrimary size={9} font="montserrat_medium" style={tw`text-white`}>
            Accept
          </TextPrimary>
        </SmallButton>
      </View>
    </View>
  );
};

export default EventInvitesItem;

const styles = StyleSheet.create({});
