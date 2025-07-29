import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import tw from "../lib/tailwind";
import images from "../utils/constants/images";
import SmallButton from "./buttons/SmallButton";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants";
import BottomModals from "./modals/BottomModals";
import InputTextWithLabel from "./inputs/InputWithLabel";
import PrimaryButton from "./buttons/PrimaryButtom";
import InputText from "./inputs/InputText";
import { useRequestActionMutation } from "../state/features/services/membership/membership";
import Toast from "react-native-toast-message";

interface ItemProps {
  onPress?: () => void;
  item: any;
  designation: string;
  handleSubmit: (item: any) => void;
  toggleModal: (item: any) => void;
  isLoading?: boolean;
  membershipId: string;
  setToggleAction: any;
}

const MembershipRequestItem = ({
  item,
  designation,
  handleSubmit,
  isLoading,
  membershipId,
  toggleModal,
  setToggleAction,
}: ItemProps) => {
  return (
    <>
      <View style={[tw` p-3  rounded-[10px] dark:bg-gray_dark bg-light`]}>
        <View style={tw`gap-4 flex-row items-center justify-between`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <Image
              source={
                item.individual.photo
                  ? { uri: item.individual.photo }
                  : images.profileImg
              }
              resizeMode="cover"
              style={tw`h-[70px]  w-[70px] rounded-full `}
            />
            <View style={tw`flex-col justify-between   w-full `}>
              <TextPrimary color="#fff">
                {item.individual.firstName} {item.individual.lastName}
              </TextPrimary>
              <TextPrimary
                font="montserrat_medium"
                size={11}
                color="#A6A6A6"
                style={tw`mt-1 text-gray_light`}
              >
                {item.individual.email}
              </TextPrimary>
              <TextPrimary
                font="montserrat_medium"
                size={11}
                color="#A6A6A6"
                style={tw`mt-1 text-gray_light`}
              >
                {designation}
              </TextPrimary>
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
          <SmallButton
            onPress={() => {
              toggleModal(item);
              setToggleAction("decline");
            }}
            style={tw`h-7 bg-transparent border border-red-600`}
          >
            <TextPrimary
              size={9}
              font="montserrat_medium"
              style={tw`text-red-600`}
            >
              Decline
            </TextPrimary>
          </SmallButton>
          <SmallButton
            isLoading={isLoading}
            style={tw`h-7 `}
            onPress={() => {
              toggleModal(item);
              setToggleAction("accept");
            }}
          >
            <TextPrimary
              size={9}
              font="montserrat_medium"
              style={tw`text-white`}
            >
              Accept
            </TextPrimary>
          </SmallButton>
        </View>
      </View>
    </>
  );
};

export default MembershipRequestItem;

const styles = StyleSheet.create({});
