import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import { colors } from "../../utils/constants";
import TextPrimaryPrimary from "../../components/texts/text";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import {
  useGetAllSubscriptionPlansQuery,
  useGetPaymentGatewayQuery,
  useGetUserQuery,
  useOrgGeneralsubscribeMutation,
} from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";
import TextPrimary from "../../components/texts/text";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import Toast from "react-native-toast-message";
import GeneralSubItem from "../../components/GeneralSubItem";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";

const GeneralSubscription = ({ navigation }: any) => {
  const { data, isLoading, refetch, isFetching } =
    useGetAllSubscriptionPlansQuery();
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const { data: userData, isLoading: isGettingUser } = useGetUserQuery();
  const { data: gateWay, isLoading: isLoadingGateway } =
    useGetPaymentGatewayQuery();
  const [planId, setPlanId] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingPayment, setPendingPayment] = useState<null | {
    planId: string;
    amount: number;
  }>(null);
  // console.log("gateWay", gateWay)

  const [subscribe, { isLoading: isSubscribing }] =
    useOrgGeneralsubscribeMutation();

  const { email } = userData?.data || {};

  if (isLoading || isGettingUser || isLoadingGateway) return <PageLoader />;

  const subscriptionData = [...(data?.data || [])].sort((a, b) => {
    // Move active plan to the top
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    return 0;
  });

  const filteredPlan = data?.data?.filter(
    (item: any) =>
      `${item.name}`.toLowerCase().includes(searchQuery.toLowerCase()) || "",
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <PageContainer>
        <ScrollView
          style={tw``}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw`flex-row justify-between items-center`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Organization Subscription
            </Header>
            <View />
          </View>

          <View>
            <TextPrimaryPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5`}
            >
              Current Plan
            </TextPrimaryPrimary>
            <View style={tw`mt-3`}>
              {subscriptionData.map((item) => {
                if (item.isActive) {
                  return (
                    <GeneralSubItem
                      item={item}
                      onPress={() =>
                        navigation.navigate("GeneralSubscriptionDetails", {
                          id: item.id,
                        })
                      }
                    />
                  );
                }
              })}
            </View>
          </View>
          <View style={tw`mt-8`}>
            <TextPrimaryPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5`}
            >
              All Available subscription plans
            </TextPrimaryPrimary>

            <View style={tw`mt-4`}>
              <InputText
                placeholder="Search"
                style={tw`h-6 rounded-[5px] w-[173px] ml-auto`}
                iconRight={icons.search}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={tw`mt-3`}>
              <FlatList
                data={filteredPlan}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  if (!item.isActive) {
                    return (
                      <GeneralSubItem
                        item={item}
                        onPress={() =>
                          navigation.navigate("GeneralSubscriptionDetails", {
                            id: item.id,
                          })
                        }
                      />
                    );
                  }
                }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`gap-5`}
              />
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default GeneralSubscription;

const styles = StyleSheet.create({});
