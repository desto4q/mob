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

          <View style={tw`mt-6 gap-5`}>
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
      style={tw`bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 shadow-md border border-gray-800`}
      android_ripple={{ color: "#ccc" }}
    >
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row`}>
            <BaseText
              style={tw`text-sm font-semibold p-2 bg-primary/50 rounded-full  mb-2 `}
            >
              {e.plan.name}
            </BaseText>
          </View>
          <BaseText style={tw`text-sm  mt-1`}>
            ₦{e.plan.price} • {e.plan.validity} days
          </BaseText>
        </View>

        <MaterialIcons name="arrow-forward-ios" size={16} color="#A3A3A4" />
      </View>

      <BaseText style={tw`text-sm opacity-70  mt-3`}>
        {e.plan.description}
      </BaseText>
    </Pressable>
  );
};
