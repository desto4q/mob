import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import TextPrimary from "../texts/text";
import SmallButton from "../buttons/SmallButton";
import { colors } from "../../utils/constants";
import tw from "../../lib/tailwind";
import { formatDate } from "../../utils/helpers";

interface ItemProps {
    image: ImageSourcePropType;
    onPress?: () => void;
    item:any

}

const InvitationItem = ({ onPress, image, item }:ItemProps) => {

  const status = item?.status;

  console.log(item)
  return (
    <Pressable style={tw`gap-1 flex-row w-full  justify-between `} onPress={onPress}>
      <View
        style={tw`flex-row flex-1 gap-2  items-center rounded-[10px] overflow-hidden`}
      >
        <Image
          source={{uri: item?.user?.photo}}
          resizeMode="cover"
          style={tw` h-[66px]  w-[66px] rounded-full`}
        />

        <View style={tw`flex-col justify-between   w-full `}>

          <TextPrimary color="#fff">
          {item?.user?.firstName}  {item?.user?.lastName}
          </TextPrimary>
          <TextPrimary font="montserrat_regular" size={11} color="#A6A6A6" style={tw`mt-1`}>
          {item?.user?.email}
          </TextPrimary>
          <TextPrimary font="montserrat_regular" size={11} color="#A6A6A6" style={tw`mt-1`}>
          Invited on {formatDate(item?.invitedAt)}
          </TextPrimary>
         
        </View>
      </View>

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
    </Pressable>
  );
};

export default InvitationItem;

const styles = StyleSheet.create({});
