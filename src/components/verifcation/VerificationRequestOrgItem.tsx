import {
  Alert,
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
import BottomModals from "../modals/BottomModals";
import InputTextWithLabel from "../inputs/InputWithLabel";
import PrimaryButton from "../buttons/PrimaryButtom";
import images from "../../utils/constants/images";
import { formatDate } from "../../utils/helpers";
import { useUpdateVerificationStatusMutation } from "../../state/features/services/verification/verification";
import Toast from "react-native-toast-message";

interface ItemProps {
  item: any;
}

const VerificationRequestOrgItem = ({ item }: ItemProps) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [memberId, setMemberId] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [role, setrole] = useState("");

  const [updateRequest, { isLoading: isUpdating }] =
    useUpdateVerificationStatusMutation();
  const [declineRequest, { isLoading: isDeclining }] =
    useUpdateVerificationStatusMutation();

  const handleAccept = async (requestId: string) => {
    try {
      const response = await updateRequest({
        requestId,
        status: "active",
      });
      console.log(response?.error);
      if (response?.error) {
        console.log("error", response.error);
        return Alert.alert("error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };
  const handleDecline = async (requestId: string) => {
    try {
      const response = await declineRequest({
        requestId,
        status: "declined",
      });
      console.log(response?.error);
      if (response?.error) {
        console.log("error", response.error);
        return Alert.alert("error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <>
      <View style={[tw` p-3  rounded-[10px] dark:bg-gray_dark bg-light`]}>
        <View style={tw`gap-4 flex-row items-center justify-between`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <Image
              source={{ uri: item?.user?.photo }}
              resizeMode="cover"
              style={tw`h-[70px]  w-[70px] rounded-full `}
            />
            <View style={tw`flex-col justify-between   w-full `}>
              <TextPrimary color="#fff">
                {item?.user?.firstName} {item?.user?.lastName}
              </TextPrimary>
              <TextPrimary
                font="montserrat_medium"
                size={11}
                color="#A6A6A6"
                style={tw`mt-1 text-gray_light`}
              >
                {item?.user?.email}
              </TextPrimary>
              <TextPrimary
                font="montserrat_medium"
                size={11}
                color="#A6A6A6"
                style={tw`mt-1 text-gray_light`}
              >
                Requested on {formatDate(item?.dateRequested)}
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
            onPress={() => handleDecline(item?.id)}
            isLoading={isDeclining}
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
            isLoading={isUpdating}
            style={tw`h-7 `}
            onPress={() => handleAccept(item?.id)}
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

export default VerificationRequestOrgItem;

const styles = StyleSheet.create({});
