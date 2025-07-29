import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import images from "../../utils/constants/images";
import tw from "../../lib/tailwind";
import TextPrimary from "../texts/text";
import { width } from "../../utils/constants";
import ImageComp from "../ImageComp";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/helpers";
import { useEvent } from "react-native-reanimated";

export interface Card {
  cardNumber: string;
  createdAt: string;
  createdBy: string;
  dateIssued: string;
  designation: string;
  expiryDate: string;
  id: string;
  individual: Individual;
  memberId: string;
  organization: Organization;
  organizationId: string;
  status: string;
  template: Template;
  templateId: string;
  updatedAt: string;
  mobiHolderId: string;
}

export interface Individual {
  aboutCompany: string | null;
  acceptedTnC: boolean;
  accountType: string;
  companyAddress: string | null;
  companyEmail: string | null;
  companyName: string | null;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  emailVerifiedAt: string;
  firstName: string;
  id: string;
  isSuperAdmin: boolean;
  isVerified: boolean;
  lastName: string;
  mobiHolderId: string;
  natureOfOrganization: string | null;
  phoneNumber: string;
  photo: string;
  status: string;
  updatedAt: string;
  username: string;
  wallet: string;
}

interface Organization {
  aboutCompany: string;
  acceptedTnC: boolean;
  accountType: string;
  companyAddress: {
    country: string;
    state: string;
    street: string;
  };
  companyEmail: string;
  companyName: string;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  emailVerifiedAt: string;
  firstName: string;
  id: string;
  isSuperAdmin: boolean;
  isVerified: boolean;
  lastName: string;
  mobiHolderId: string;
  natureOfOrganization: string;
  phoneNumber: string;
  photo: string;
  status: string;
  updatedAt: string;
  username: string;
  wallet: string;
}

interface Template {
  backgroundColor: string;
  createdAt: string;
  fontSize: number[];
  id: string;
  is_default: boolean;
  layout: string;
  logo: string | null;
  name: string;
  organizationId: string;
  textColor: string;
  updatedAt: string;
}

const HorizontalCard = ({
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
  //   console.log(card);

  if (!card) return null;

  // const fontSize = card?.fontSize?.replace(/\[|\]/g, "");
  const cardDataTemplate = cardData?.template;
  const cardDataIndividual = cardData?.individual;
  const cardDataOrganization = cardData?.organization;

  return (
    <View
      style={[
        { width: width },
        tw`w-full rounded-[10px] p-4 bg-gray_dark`,
        style,
      ]}
    >
      <View style={tw`flex-row justify-between`}>
        <TextPrimary size={13} style={tw`text-white  text-left`}>
          {card?.name}
        </TextPrimary>
        {!cardData && (
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            style={tw`dark:text-gray_light text-dark`}
            onPress={onPress}
          />
        )}
      </View>
      <View
        style={tw`w-full rounded-[10px] overflow-hidden bg-[${card?.backgroundColor}] mt-3`}
      >
        <View style={tw` p-3 flex-row gap-1 items-center justify-end`}>
          <Image source={{ uri: card?.logo }} style={tw`w-4 h-4`} />
          <TextPrimary
            font="medium"
            size={11}
            style={tw`text-[${card.textColor}] text-left`}
          >
            {cardDataOrganization
              ? cardDataOrganization?.companyName
              : "Organization Name"}
          </TextPrimary>
        </View>

        <View style={tw`p-3`}>
          <View style={tw`flex-row items-center gap-4`}>
            {cardData?.individual ? (
              <View style={tw`bg-primary/50 p-1 rounded-full`}>
                <Image
                  resizeMode="cover"
                  source={{ uri: cardData.individual.photo }}
                  style={tw`w-[82px] h-[82px] rounded-full`}
                />
              </View>
            ) : (
              <View
                style={tw`w-[82px] h-[82px] bg-gray_light rounded-full`}
              ></View>
            )}
            <View>
              <View style={tw`flex-row gap-2`}>
                <TextPrimary size={10} style={tw`text-left text-[#205DC8]`}>
                  Name
                </TextPrimary>
                <TextPrimary
                  font="medium"
                  size={10}
                  style={tw`text-left text-[${card.textColor}]`}
                >
                  {cardDataIndividual
                    ? `${cardDataIndividual.firstName} ${cardDataIndividual.lastName} `
                    : ":------"}
                </TextPrimary>
              </View>
              <View style={tw`flex-row gap-2`}>
                <TextPrimary size={10} style={tw`text-left text-[#205DC8]`}>
                  Staff ID :
                </TextPrimary>
                <TextPrimary
                  font="medium"
                  size={10}
                  style={tw`text-left text-[${card.textColor}]`}
                >
                  {cardData?.individual?.mobiHolderId || ":------"}
                </TextPrimary>
              </View>
              <View style={tw`flex-row gap-2`}>
                <TextPrimary size={10} style={tw`text-left text-[#205DC8]`}>
                  Category :
                </TextPrimary>
                <TextPrimary
                  font="medium"
                  size={10}
                  style={tw`text-left text-[${card.textColor}]`}
                >
                  {cardDataTemplate ? cardDataTemplate?.name : ":------"}
                </TextPrimary>
              </View>
            </View>
          </View>

          <View style={tw`flex-row justify-between mt-1`}>
            <View style={tw`gap-1`}>
              <TextPrimary size={10} style={tw`text-left text-[#205DC8]`}>
                Date Issued
              </TextPrimary>
              <TextPrimary
                font="medium"
                size={10}
                style={tw`text-left text-[${card.textColor}]`}
              >
                {cardData ? formatDate(cardData?.dateIssued) : ":------"}
              </TextPrimary>
            </View>
            <View style={tw`gap-1`}>
              <TextPrimary size={10} style={tw`text-left text-[#205DC8]`}>
                Role
              </TextPrimary>
              <TextPrimary
                font="medium"
                size={10}
                style={tw`text-left text-[${card.textColor}]`}
              >
                {cardData ? cardData?.designation : ":------"}
              </TextPrimary>
            </View>
            <View style={tw`gap-1`}>
              <TextPrimary size={10} style={tw`text-left text-[#205DC8]`}>
                Card Number
              </TextPrimary>
              <TextPrimary
                font="medium"
                size={10}
                style={tw`text-left text-[${card.textColor}]`}
              >
                {cardData ? cardData?.cardNumber.slice(0, 5) : ":------"}
              </TextPrimary>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({});
