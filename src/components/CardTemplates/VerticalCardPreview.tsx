import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import tw from "../../lib/tailwind";
import { width } from "../../utils/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/helpers";

import BaseText from "../BaseText";
import { Card } from "./HorizontalCard";
import { useEvent } from "react-native-reanimated";

const VerticalCardPreview = ({
  navigation,
  style,
  height,
  card,
  onPress,
  cardData,
}: {
  [key: string]: any;
  cardData: Card;
}) => {
  // console.warn(card.fontSize);
  // const fontSize = card.fontSize.replace(/\[|\]/g, "");
  const cardDataTemplate = cardData?.template;
  const cardDataIndividual = cardData?.individual;
  const cardDataOrganization = cardData?.organization;
  const template = cardData ? cardData?.template : card;
  useEffect(() => {
    console.log("card ind", cardData);
  }, []);
  return (
    <Pressable
      style={[
        { width: width },
        tw`w-10/12 rounded-2xl p-5 bg-[${template ? template?.backgroundColor : card?.backgroundColor}]  p-2`,
        style,
      ]}
    >
      <View style={tw`flex-row justify-between   items-center mb-4`}>
        <BaseText {...template} style={tw`text-xl`}>
          {card.name}
        </BaseText>
        {!cardData && (
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            style={tw`text-gray-500`}
            onPress={onPress}
          />
        )}
      </View>
      <View
        style={tw`w-full rounded-2xl overflow-hidden  shadow-md border border-[${template?.textColor}]`}
      >
        <View
          style={tw`p-4 flex-row gap-2 items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image source={{ uri: card.logo }} style={tw`w-6 h-6 rounded`} />
            <BaseText {...template} size={12} style={tw`text-white`}>
              {cardDataOrganization
                ? cardDataOrganization?.companyName
                : "Organization Name"}
            </BaseText>
          </View>
        </View>

        <View style={tw`px-6 py-5`}>
          <View style={tw`items-center mb-6`}>
            {cardData?.individual ? (
              <View style={tw`shadow-lg`}>
                <Image
                  resizeMode="cover"
                  source={{ uri: cardData.individual.photo }}
                  style={tw`w-24 h-24 rounded-full border-4 border-white border-[${template?.textColor}]/50 shadow-md`}
                />
              </View>
            ) : (
              <View
                style={tw`w-24 h-24 bg-[${template.backgroundColor}] rounded-full border-4 border-white shadow-md items-center justify-center`}
              >
                <MaterialCommunityIcons name="account" style={tw``} size={32} />
              </View>
            )}
            <View style={tw`items-center mt-3 mb-4`}>
              <BaseText
                {...template}
                style={tw`text-blue-600 font-medium mb-1`}
              >
                Full Name
              </BaseText>
              <BaseText {...template} style={tw`text-gray-800 text-center`}>
                {cardDataIndividual
                  ? `${cardDataIndividual.firstName} ${cardDataIndividual.lastName}`
                  : "--------"}
              </BaseText>
            </View>

            <View
              style={tw`bg-gray-50 rounded-xl p-4 w-full border border-[${template?.textColor}]/50`}
            >
              <View
                style={tw`flex-row justify-between items-center py-2 border-b border-gray-200 border-[${template?.textColor}]/80`}
              >
                <BaseText {...template} style={tw`text-blue-600 font-medium`}>
                  Staff ID
                </BaseText>
                <BaseText
                  {...template}
                  size={11}
                  style={tw`text-gray-700 text-right`}
                >
                  {cardData?.organization}
                  {/* {(cardData?.individual?.mobiHolderId ??
                    cardData.mobiHolderId) ||
                    "------"} */}
                </BaseText>
              </View>

              <View
                style={tw`flex-row justify-between items-center py-2 border-b border-[${template?.textColor}]/80 border-gray-200`}
              >
                <BaseText {...template} style={tw`text-blue-600 font-medium`}>
                  Category
                </BaseText>
                <BaseText
                  {...template}
                  size={11}
                  style={tw`text-gray-700 text-right`}
                >
                  {cardDataTemplate ? cardDataTemplate?.name : "------"}
                </BaseText>
              </View>

              <View
                style={tw`flex-row justify-between items-center py-2 border-b border-[${template?.textColor}]/80 border-gray-200`}
              >
                <BaseText {...template} style={tw`text-blue-600 font-medium`}>
                  Date Issued
                </BaseText>
                <BaseText {...template} style={tw`text-gray-700 text-right`}>
                  {cardData ? formatDate(cardData?.dateIssued) : "------"}
                </BaseText>
              </View>

              <View
                style={tw`flex-row justify-between items-center py-2 border-b border-[${template?.textColor}]/80 border-gray-200`}
              >
                <BaseText {...template} style={tw`text-blue-600 font-medium`}>
                  Role
                </BaseText>
                <BaseText {...template} style={tw`text-gray-700 text-right`}>
                  {cardData ? cardData?.designation : "------"}
                </BaseText>
              </View>

              <View style={tw`flex-row justify-between items-center py-2`}>
                <BaseText {...template} style={tw`text-blue-600 font-medium`}>
                  Card Number
                </BaseText>
                <View style={tw`flex-1 ml-2`}>
                  <BaseText
                    {...template}
                    style={tw`text-gray-700 text-right`}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {cardData ? cardData?.cardNumber : "------"}
                  </BaseText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default VerticalCardPreview;
