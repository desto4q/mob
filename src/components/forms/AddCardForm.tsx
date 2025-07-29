import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import ScanBox from "../ScanBox";
import tw from "twrnc";

import icons from "../../utils/constants/icons";
import TextPrimary from "../texts/text";
import PrimaryButton from "../buttons/PrimaryButtom";
const AddCardForm = () => {
  return (
    <View style={tw`pt-5 pb-20`}>
      <View style={tw`gap-2`}>
        <InputTextWithLabel label="Designation" />
        <InputTextWithLabel label="Expiry Date" icon={icons.event} />
      </View>

      <TextPrimary size={13} style={tw`py-3`}>
        Scan ID Card
      </TextPrimary>
      <View
        style={tw`flex-row justify-between p-5 border border-[#122F62] rounded-[10px] `}
      >
        <ScanBox label="scan FRONT of ID Card" />
        <ScanBox label="scan BACK of ID Card" />
      </View>

      <View style={tw`pt-10`}>
        <PrimaryButton>Add Card </PrimaryButton>
      </View>
    </View>
  );
};

export default AddCardForm;

const styles = StyleSheet.create({});
