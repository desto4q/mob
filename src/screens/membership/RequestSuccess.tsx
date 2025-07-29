import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import TextPrimary from "../../components/texts/text";
import { colors, width } from "../../utils/constants";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import tw from "../../lib/tailwind";

const RequestSuccess = ({ navigation, route }: any) => {
  const message = route?.params?.message;
  const title = route?.params?.title;
  const insets = useSafeAreaInsets();

  return (
    <>
      <PageContainer>
        <View style={tw`mt-5 px-[5%]  justify-center items-center flex-1`}>
          <Image
            source={require("../../../assets/success.gif")}
            resizeMode="cover"
            style={tw`w-[117px] h-[117px]`}
          />
          <TextPrimary font="medium" size={15}>
            {title ? title : "Success!"}
          </TextPrimary>
          <TextPrimary
            font="medium"
            size={12}
            color={colors.gray_light}
            style={tw`text-center text-[#A3A2A2] mt-4`}
          >
            {message ? message : "Your request was successfully sent"}
          </TextPrimary>

          <View style={tw`mt-10 flex-row`}>
            <PrimaryButton
              onPress={() => navigation.navigate("Home")}
              style={tw`w-[100%]`}
            >
              Okay, thanks
            </PrimaryButton>
          </View>
        </View>
      </PageContainer>
    </>
  );
};

export default RequestSuccess;

const styles = StyleSheet.create({});
