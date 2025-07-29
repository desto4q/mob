import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import TextPrimary from "../texts/text";
import SmallButton from "../buttons/SmallButton";
import { colors } from "../../utils/constants";
import tw from "../../lib/tailwind";
import ImageComp from "../ImageComp";
import icons from "../../utils/constants/icons";
import { formatDate } from "../../utils/helpers";

interface ItemProps {
  image: ImageSourcePropType;
  onPress: () => void;
  item:any
}

const ManageIdItem = ({ onPress, image, item }: ItemProps) => {
  // console.log(item?.expiryDate);
  const individualData = item?.individual;

  console.log(item.status);

  return (
    <Pressable
      style={tw`gap-1 flex-row w-full  justify-between `}
      onPress={onPress}
    >
      <View
        style={tw`flex-row flex-1 gap-2  items-center rounded-[10px] overflow-hidden`}
      >
        <Image
          source={{ uri: individualData?.photo }}
          resizeMode="cover"
          style={tw` h-[66px]  w-[66px] rounded-full`}
        />

        <View style={tw`flex-col justify-between   w-full `}>
          <TextPrimary color="#fff">
            {individualData.firstName} {individualData.lastName}
          </TextPrimary>
          <TextPrimary
            font="montserrat_regular"
            size={10}
            color="#A6A6A6"
            style={tw`mt-1 text-gray_light`}
          >
            ID: {individualData?.mobiHolderId}
          </TextPrimary>
          <View style={[tw`flex-row items-center gap-2 `]}>
            <ImageComp image={icons.event} size={12} />
            <TextPrimary
              font="montserrat_regular"
              size={10}
              color={colors.gray_light}
              style={tw`text-gray_light`}
            >
              {formatDate(item?.expiryDate)}
            </TextPrimary>
          </View>
        </View>
      </View>

      <View
        style={[
          tw` items-start gap-1 mt-auto px-2 py-1 rounded-md`,
          {
            backgroundColor: item?.status === "active" ? "#1E2F17" : "#2F1717",
          },
        ]}
      >
        <TextPrimary
          font="medium"
          size={12}
          style={[
            tw`leading-[12px] capitalize text-[#19A631]`,
            {
              color: item?.status === "active" ? "#4CD964" : "#F74D1B",
            },
          ]}
          color="#19A631"
        >
          {item.status}
        </TextPrimary>
      </View>
    </Pressable>
  );
};

export default ManageIdItem;

const styles = StyleSheet.create({});
