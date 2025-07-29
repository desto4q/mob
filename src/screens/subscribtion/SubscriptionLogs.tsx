import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants";
import TextPrimary from "../../components/texts/text";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import PageLoader from "../../components/Loader";
import MaterialErrorComponent from "../../components/errors/ErrorComp";
import BaseText from "../../components/BaseText";
export interface LOG {
  id: number;
  individualId: string;
  plan: {
    id: number;
    name: string;
    price: string;
    validity: number;
    description: string;
  };
}
interface API_RESPONSE {
  code: number;
  message: string;
  data: LOG[];
}
const SubscriptionLogs = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const query = useQuery({
    queryKey: ["subscription logs"],
    queryFn: async () => {
      let response = await newApi.get<API_RESPONSE>(
        "/api/memberships-subscriptions/get/subscribers?status=active",
      );
      return response.data;
    },
  });
  console.log(JSON.stringify(query.data?.data[0]));
  // useEffect(() => {
  //   console.log(JSON.stringify(query.error?.response.data.message));
  // }, [query.isError]);
  if (query.isFetching) return <PageLoader />;
  if (query.isError)
    return (
      <PageContainer padding={0}>
        <MaterialErrorComponent
          backButton
          showRetryButton
          message={query.error?.response?.data?.message}
          onRetry={query.refetch}
        />
      </PageContainer>
    );
  return (
    <PageContainer>
      <ScrollView style={tw``}>
        <View style={tw` flex-row justify-between`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Subscription Log
          </Header>

          <View />
        </View>

        <View style={tw``}>
          <TextPrimary
            size={13}
            font="medium"
            color={colors.gray_light}
            style={tw`mt-5 text-gray_light`}
          >
            All subscriptions made to your organisation
          </TextPrimary>

          <View style={tw`flex-row gap-5 mt-5`}>
            <View style={tw`flex-1`}>
              <InputText
                icon={icons.search}
                placeholder="Search"
                style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
              />
            </View>
            <Pressable
              // onPress={toggleFilterModal}
              style={tw` border border-[#484848] w-[38px] h-[36px] justify-center items-center rounded-[10px] bg-[${colors.gray_dark}]`}
            >
              <MaterialIcons name="filter-list" size={24} color="#A3A3A4" />
            </Pressable>
          </View>

          <View style={tw`mt-6 gap-5 px-3`}>
            {/* <BaseText>{JSON.stringify(query.data?.data)}</BaseText> */}
            {/* {/* <SubscriptionLogItem onPress={() => navigation.navigate("MemberPreview")}/> */}
            {query.data?.data.map((e) => {
              return <SubItem {...e} key={e.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default SubscriptionLogs;

const styles = StyleSheet.create({});

// let SubItem = (e: LOG) => {
//   return <View>{ }</View>;
// };

let SubItem = (e: LOG) => {
  return (
    <Pressable
      style={tw`bg-white dark:bg-[#121212] rounded-3xl p-6 shadow-lg border-0 mb-4`}
      android_ripple={{ color: "#E3F2FD", borderless: false }}
    >
      {/* Header Section */}
      <View style={tw`flex-row justify-between items-start mb-4`}>
        <View style={tw`flex-1 mr-4`}>
          {/* Plan Name Badge */}
          <View style={tw`flex-row mb-3`}>
            <View
              style={tw`bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-2 rounded-full border border-primary/30`}
            >
              <BaseText
                style={tw`text-sm font-bold text-primary uppercase tracking-wide`}
              >
                {e.plan.name}
              </BaseText>
            </View>
          </View>

          {/* Price and Validity */}
          <View style={tw`flex-row items-center mb-2`}>
            <BaseText
              style={tw`text-2xl font-bold text-gray-900 dark:text-white mr-3`}
            >
              ₦{e.plan.price.toLocaleString()}
            </BaseText>
            <View
              style={tw`bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full`}
            >
              <BaseText
                style={tw`text-xs font-medium text-gray-600 dark:text-gray-300`}
              >
                {e.plan.validity} days
              </BaseText>
            </View>
          </View>
        </View>

        {/* Action Indicator */}
        <View style={tw`bg-gray-50 dark:bg-gray-800 p-3 rounded-full`}>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#6B7280" />
        </View>
      </View>

      {/* Divider */}
      {/* <View style={tw`h-px bg-gray-200 dark:bg-gray-700 mb-4`} /> */}

      {/* Description Section */}
      <View>
        <BaseText
          style={tw`text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2`}
        >
          Description
        </BaseText>
        <BaseText
          style={tw`text-sm leading-5 text-gray-700 dark:text-gray-300`}
        >
          {e.plan.description}
        </BaseText>
      </View>

      {/* Subtle hover/press state indicator */}
      <View style={tw`absolute inset-0 rounded-3xl bg-primary/5 opacity-0`} />
    </Pressable>
  );
};
