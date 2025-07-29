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
import images from "../../utils/constants/images";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import SubPlanItem from "../../components/SubPlanItem";
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants";
import TabSelect from "../../components/TabSelect";
import PlanDetails from "../../components/PlanDetails";
import ProfileItem from "../../components/ProfileItem";
import icons from "../../utils/constants/icons";
import CheckoutFrom from "../../components/forms/CheckoutForm";
import BackButton from "../../components/BackButton";

const Checkout = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Checkout
            </Header>
            <View />
          </View>

          <View style={tw`mt-5`}>
            <PlanDetails />
          </View>

          <View style={tw`mt-5 pb-10`}>
            <View style={tw`pb-5 gap-2`}>
              <TextPrimary size={15} font="medium">
                Choose Payment Methods
              </TextPrimary>
            </View>

            <View style={tw`mb-8 gap-5`}>
              <ProfileItem label="Card" icon={icons.card} />
              <ProfileItem label="Bank Transfer" icon={icons.security} />
            </View>
            <View style={tw`gap-5`}>
              <TextPrimary size={15} font="medium">
                Choose Payment Methods
              </TextPrimary>
              <CheckoutFrom />
            </View>
            <View style={tw`mt-10`}>
              <PrimaryButton>Subscribe</PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
