import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import ScanBox from "../ScanBox";
import tw from "twrnc";

import icons from "../../utils/constants/icons";
import TextPrimary from "../texts/text";
import PrimaryButton from "../buttons/PrimaryButtom";
import { useGetUserQuery } from "../../state/features/services/users/user";
import moment from "moment"; 


const AccountInfoForm = () => {
  
  const { data } = useGetUserQuery();
  const {
    accountType,
    createdAt,
    mobiHolderId,
  } = data?.data || {};

  return (
    <View style={tw`pt-5 pb-20`}>
      <View style={tw`gap-2`}>
        
        <InputTextWithLabel label="Date Joined" value={moment(createdAt).format("YYYY-MM-DD")} icon={icons.event} />
        <InputTextWithLabel label="Account Type" value={accountType} />
        <InputTextWithLabel label="MobiHolder ID " value={mobiHolderId} placeholder="1213 1241 5523"/>
      </View>

    </View>
  );
};

export default AccountInfoForm;

const styles = StyleSheet.create({});
