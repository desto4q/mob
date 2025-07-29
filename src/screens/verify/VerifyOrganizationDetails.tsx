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
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import icons from "../../utils/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ListItem from "../../components/ListItem";
import images from "../../utils/constants/images";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import BackButton from "../../components/BackButton";

const VerifyOriganizationDetails = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Organization Details
            </Header>
            <View />
          </View>

          <View style={tw`mt-5`}>
            <Image
              source={images.member}
              resizeMode="cover"
              style={tw`w-full h-[183px]`}
            />
          </View>

          <View style={tw`mt-5 px-[5%]`}>
            <View style={tw`mt-8 gap-4 `}>
              <ListItem
                icon={icons.card_number}
                itemKey="Name"
                value="Attach Enterprice"
              />
              <ListItem
                icon={icons.company}
                itemKey="Email"
                value="testmail@gmail.com"
              />
              <ListItem icon={icons.role} itemKey="Role" value="Seles Rep" />
              <ListItem
                icon={icons.event}
                itemKey="Date Registered"
                value="30-11-2022"
              />
              <ListItem
                icon={icons.event}
                itemKey="ID Card Number"
                value="3423HWR56"
              />
            </View>
            <View style={tw`mt-16`}>
              <PrimaryButton>Send Verification Request</PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default VerifyOriganizationDetails;

const styles = StyleSheet.create({});
