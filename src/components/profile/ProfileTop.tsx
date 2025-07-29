import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileImage from "../ProfileImage";
import Header from "../texts/header";
import tw from "twrnc";
import { colors } from "../../utils/constants";
import { useGetUserQuery } from "../../state/features/services/users/user";

const ProfileTop = ({icon}:any) => {
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  
  const { firstName, lastName, email, phoneNumber, accountType } = data?.data as any || {};

  return (
    <View style={tw`flex-row items-center gap-3`}>
      <ProfileImage icon={icon} />
      <View style={tw`gap-1`}>
        <Header>{firstName} {lastName}</Header>
        <Header color={colors.gray_light} size={11}>{accountType} Account</Header>
      </View>
    </View>
  );
};

export default ProfileTop;

const styles = StyleSheet.create({});
