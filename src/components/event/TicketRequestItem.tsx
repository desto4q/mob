import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import TextPrimary from "../texts/text";
import SmallButton from "../buttons/SmallButton";
import { colors } from "../../utils/constants";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ImageComp from "../ImageComp";
import icons from "../../utils/constants/icons";
import { formatDate } from "../../utils/helpers";

interface ItemProps {
    image: ImageSourcePropType;
    toggleModal: (item:any, action: string) => void;
    item:any
}

const TicketRequestItem = ({  image, item , toggleModal}:ItemProps) => {
  console.log("item", item)
  return (
    <View style={tw`gap-1 flex-row w-full  justify-between `}>
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
          {item?.user?.firstName} {item?.user?.lastName}
          </TextPrimary>
          <View style={tw`flex-row items-center gap-2 `}>
          <ImageComp image={icons.ticket} size={12}/>
            <TextPrimary
              font="montserrat_regular"
              size={10}
              color={colors.gray_light}
            >
             {item?.ticket?.name}
            </TextPrimary>
          </View>
          <View style={[tw`flex-row items-center gap-2 `]}>
            <ImageComp image={icons.event} size={12}/>
            <TextPrimary
              font="montserrat_regular"
              size={10}
              color={colors.gray_light}
            >
             {formatDate(item?.createdAt)}
            </TextPrimary>
          </View>
         
        </View>
      </View>

      <View style={tw`flex-row  items-start gap-3 mt-auto `}>
       
        <Pressable style={tw`bg-[#F23C2433] px-2 py-3 rounded-[10px]`} onPress={() => toggleModal(item, 'decline')}>
        <Feather name="x" size={20} color="#FC4848" />
        </Pressable>
         
        <Pressable onPress={() => toggleModal(item, 'approve')} style={tw`bg-[#A324F2] px-2 py-3 rounded-[10px]`}>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default TicketRequestItem;

const styles = StyleSheet.create({});
