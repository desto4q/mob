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
import tw from "../../lib/tailwind";
import ImageComp from "../ImageComp";
import icons from "../../utils/constants/icons";
import { formatDate } from "../../utils/helpers";

interface ItemProps {
  image: ImageSourcePropType;
  onPress: () => void;
  item: any;
}

const VerifiersEventItem = ({ onPress, image, item }: ItemProps) => {
  return (
    <Pressable
      style={[tw` p-3  rounded-[10px] dark:bg-gray_dark bg-light`]}
      onPress={onPress}
    >
      <View style={tw`gap-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row gap-2 items-center`}>
          <Image
            source={item?.image ? { uri: item?.image } : image}
            resizeMode="cover"
            style={tw`h-[72px]  w-[68px] rounded-[10px] `}
          />
          <View style={tw`gap-[0.5px] items-start`}>
            <TextPrimary font="montserrat_medium" size={8} color="#3F6BB9">
              {item?.category?.name}
            </TextPrimary>
            <View style={tw`flex-row items-center  `}>
              <TextPrimary font="montserrat_medium" size={13} color="#fff">
                {item?.name}
              </TextPrimary>
            </View>
            <View style={tw`flex-row items-center gap-2 `}>
              <ImageComp image={icons.event} size={10} />
              <TextPrimary
                font="montserrat_regular"
                size={10}
                color={colors.gray_light}
              >
                {formatDate(item?.startDate)}
              </TextPrimary>
            </View>
            <View style={tw`flex-row items-center gap-2 `}>
              <TextPrimary
                font="montserrat_regular"
                size={10}
                color={colors.gray_light}
              >
                3 Verifiers
              </TextPrimary>
            </View>
          </View>
        </View>

        <MaterialIcons
          name="arrow-forward-ios"
          style={tw`text-black dark:text-white`}
          size={15}
        />
      </View>
    </Pressable>
  );
};

export default VerifiersEventItem;

const styles = StyleSheet.create({});
