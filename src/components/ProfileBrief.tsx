import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../utils/constants/images";
import Header from "./texts/header";
import TextPrimary from "./texts/text";
import tw from "twrnc";
import { useGetUserQuery } from "../state/features/services/users/user";
import BaseText from "./BaseText";

const ProfileBrief = () => {
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const { firstName, lastName, photo, accountType } = (data?.data as any) || {};
  // console.log(data.data);
  return (
    <View
      style={[
        tw`border-b border-[#353535]/50 pb-4 mb-2`,
        { marginHorizontal: 15 },
      ]}
    >
      <Image
        source={photo ? { uri: photo } : images.profileImg}
        resizeMode="cover"
        style={tw`w-[69px] h-[69px] rounded-full`}
      />
      <BaseText style={tw`justify-start items-start font-bold`}>
        {firstName} {lastName}
      </BaseText>
      <TextPrimary size={15} font="regular" style={{ marginTop: 2 }}>
        {accountType} Account
      </TextPrimary>
    </View>
  );
};

export default ProfileBrief;

const styles = StyleSheet.create({});
