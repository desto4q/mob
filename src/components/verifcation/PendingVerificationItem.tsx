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
import tw from "../../lib/tailwind";
import TextPrimary from "../texts/text";
import BottomModals from "../modals/BottomModals";
import PrimaryButton from "../buttons/PrimaryButtom";
import Toast from "react-native-toast-message";
import { formatDate } from "../../utils/helpers";

interface ItemProps {
  toggleModal: (id: string) => void;
  item: any;
}

const PendingVerificationItem = ({ toggleModal, item }: ItemProps) => {
  // const [deleteMemberInvite, { isLoading: isDeletting }] =
  //   useDeleteMemberInviteMutation();

  const status = item?.status;

  // const handleSubmit = async () => {
  //   try {
  //     const response = await deleteMemberInvite({
  //       requestId: membershipId,
  //     });
  //     console.log(response?.error);
  //     if (response?.error) {
  //       console.log("error", response.error);
  //       return Toast.show({
  //         type: "error",
  //         text1: response?.error?.data?.message,
  //       });
  //     }
  //     Toast.show({
  //       type: "success",
  //       text1: response?.data?.message,
  //     });
  //   } catch (error: any) {
  //     console.log(error);
  //     console.log(error);
  //     Toast.show({
  //       type: "error",
  //       text1: error.response?.data?.message || "An error occurred",
  //     });
  //   }
  // };

  return (
    <>
      <Pressable
        style={tw`gap-1 flex-row w-full  justify-between `}
        // onPress={onPress}
      >
        <View
          style={tw`flex-row flex-1 gap-2  items-center rounded-[10px] overflow-hidden`}
        >
          <Image
            source={{ uri: item?.user?.photo }}
            resizeMode="cover"
            style={tw` h-[66px]  w-[66px] rounded-full`}
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
              {item?.user.email}
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

        <View style={tw` items-end gap-3 mt-auto `}>
          <Pressable
            style={tw`bg-[#F23C2433] px-2 py-3 rounded-[10px]`}
            onPress={() => {
              toggleModal(item.id);
            }}
          >
            <Feather name="x" size={20} color="#FC4848" />
          </Pressable>
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
              size={9}
              style={[
                tw`leading-[12px] text-[#19A631] capitalize`,
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

          {/* <View style={tw`bg-[#A324F2] px-2 py-3 rounded-[10px]`}>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
          </View> */}
        </View>
      </Pressable>
    </>
  );
};

export default PendingVerificationItem;

const styles = StyleSheet.create({});
