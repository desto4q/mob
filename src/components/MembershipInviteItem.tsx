import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TextPrimary from "./texts/text";
import icons from "../utils/constants/icons";
import { colors } from "../utils/constants";
import images from "../utils/constants/images";
import tw from "../lib/tailwind";
import {
  useDeleteMemberInviteMutation,
  useRequestActionMutation,
} from "../state/features/services/membership/membership";
import Toast from "react-native-toast-message";
import BottomModals from "./modals/BottomModals";
import PrimaryButton from "./buttons/PrimaryButtom";

interface ItemProps {
  image?: ImageSourcePropType;
  onPress?: () => void;
  toggleModal: (item:any) => void;
  item: any;
  membershipId: string;
  designation: string;
}

const MembershipInviteItem = ({
  onPress,
  item,
  designation,
  toggleModal,
}: ItemProps) => {
  
  
 

  return (
    <>
      <View
        style={tw`gap-1 flex-row w-full  justify-between `}
        
      >
        <View
          style={tw`flex-row flex-1 gap-2  items-center rounded-[10px] overflow-hidden`}
        >
          <Image
            source={item?.photo ? { uri: item.photo } : images.profileImg}
            resizeMode="cover"
            style={tw` h-[66px]  w-[66px] rounded-full`}
          />

          <View style={tw`flex-col justify-between   w-full `}>
            <TextPrimary color="#fff">
              {item?.firstName} {item?.lastName}
            </TextPrimary>
            <TextPrimary
              font="montserrat_medium"
              size={11}
              color="#A6A6A6"
              style={tw`mt-1 text-gray_light`}
            >
              {item.email}
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

        <View style={tw`flex-row  items-start gap-3 mt-auto `}>
          <Pressable
            style={tw`bg-[#F23C2433] px-2 py-3 rounded-[10px]`}
            onPress={() => toggleModal(item)}
          >
            <Feather name="x" size={20} color="#FC4848" />
          </Pressable>

          {/* <View style={tw`bg-[#A324F2] px-2 py-3 rounded-[10px]`}>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
        </View> */}
        </View>
      </View>

      
    </>
  );
};

export default MembershipInviteItem;

const styles = StyleSheet.create({});
