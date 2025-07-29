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
import { useGetSubscriptionQuery } from "../../state/features/services/subscription/subscription";
import BackButton from "../../components/BackButton";

const AddSubscriptionDetails = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const { data } = useGetSubscriptionQuery();

  console.log(data?.data);

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Add New Subscriptions
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

          <View style={tw`mt-5 px-[5%] flex-1 mb-10`}>
            <View style={tw`pb-5 gap-2`}>
              <TextPrimary size={17} font="medium">
                Select A Plan{" "}
              </TextPrimary>
              <TextPrimary size={12} color={colors.gray_light}>
                Choose a plan that best suits you
              </TextPrimary>
            </View>

            <View style={tw`mb-8`}>
              <TabSelect data={["Monthly", "Annually"]} />
            </View>
            <View style={tw`gap-5`}>
              <SubPlanItem />

              <SubPlanItem />
            </View>
            <View style={tw`mt-16`}>
              <PrimaryButton onPress={() => navigation.navigate("Checkout")}>
                Proceed To Subscribe
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default AddSubscriptionDetails;

const styles = StyleSheet.create({});
