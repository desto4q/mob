import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import ScanBox from "../ScanBox";
import tw from "twrnc";

import icons from "../../utils/constants/icons";
import TextPrimary from "../texts/text";
import PrimaryButton from "../buttons/PrimaryButtom";


const CheckoutFrom = () => {
  return (
    <View style={tw`pt-5`}>
      <View style={tw`gap-2`}>
      <InputTextWithLabel label="Name on card" />
        <InputTextWithLabel label="Card Number" keyboardType="number-pad" />
        
        <View style={tw`flex-row justify-between gap-4`}>
          <InputTextWithLabel label="Expiry Date" />
          <InputTextWithLabel label="CVC" keyboardType="number-pad"/>
        </View>
      </View>
    </View>
  );
};

export default CheckoutFrom;

const styles = StyleSheet.create({});
