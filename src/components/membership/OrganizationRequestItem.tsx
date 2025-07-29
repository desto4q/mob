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
import tw from "../../lib/tailwind";
import TextPrimary from "../texts/text";
import SmallButton from "../buttons/SmallButton";
import images from "../../utils/constants/images";

interface ItemProps {
  image?: ImageSourcePropType;
  onPress?: () => void;
  item: any;
  designation: string;
  handleSubmit: (item: any) => void;
  handleDecline: (item: any) => void;
  isLoading?: boolean;
  membershipId: string;
  isLoadingDecline:boolean;
}

const OrganizationRequestItem = ({
  onPress,
  image,
  item,
  designation,
  handleSubmit,
  handleDecline,
  isLoading,
  membershipId,
  isLoadingDecline,
}: ItemProps) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [memberId, setMemberId] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [role, setrole] = useState("");

  const acceptData = {
    membershipId: parseInt(membershipId),
    status: "active",
  };

  const declineData = {
    membershipId: parseInt(membershipId),
    status: "declined",
  };

  return (
    <>
      <View style={[tw` p-3  rounded-[10px] dark:bg-gray_dark bg-light`]}>
        <View style={tw`gap-4 flex-row items-center justify-between`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <Image
              source={item?.photo ? { uri: item?.photo } : images.profileImg}
              resizeMode="cover"
              style={tw`h-[70px]  w-[70px] rounded-full `}
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
                {item?.email}
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
           isLoading={isLoadingDecline}
            style={tw`h-7 bg-transparent border border-red-600`}
            onPress={() => handleDecline(declineData)}
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
            onPress={() => handleSubmit(acceptData)}
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

export default OrganizationRequestItem;

const styles = StyleSheet.create({});
