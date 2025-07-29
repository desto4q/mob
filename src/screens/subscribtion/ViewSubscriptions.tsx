import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import { colors } from "../../utils/constants/colors";
import TextPrimary from "../../components/texts/text";
import { useColorScheme } from "nativewind";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import IndSubscriptionItem from "../../components/IndSubscriptionItem";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import Toast from "react-native-toast-message";
import {
  useGetIndGateWayQuery,
  useSubscribeToOrganizationMutation,
} from "../../state/features/services/subscription/subscription";
import PageLoader from "../../components/Loader";
import { useGetUserQuery } from "../../state/features/services/users/user";
import PrimaryButton from "../../components/buttons/PrimaryButtom";

const ViewSubscriptions = ({ navigation, route }) => {
  const { data, orgId } = route?.params;
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [selectedPlan, setSelectedPlan] = useState(data[0]);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  const {
    data: userData,
    isLoading: isGettingUser,
    refetch,
    isFetching,
  } = useGetUserQuery();

  const { email } = userData?.data || {};

  const [subscribe, { isLoading: isSubscribing }] =
    useSubscribeToOrganizationMutation();

  const { data: gateWay, isLoading } = useGetIndGateWayQuery(orgId);

  if (isLoading || isSubscribing || isGettingUser) return <PageLoader />;

  console.log("gateWay", gateWay);

  const payStack = gateWay?.data?.publicKey || "";

  const handleSubmit = async (refId: string) => {
    try {
      const response = await subscribe({
        organizationId: orgId,
        planId: selectedPlan.id.toString(),
        refId,
      });

      if (response?.error) {
        return Toast.show({
          type: "error",
          text1: response?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      // navigation.goBack();
      // navigation.navigate("RequestSuccess")
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <>
      <Paystack
        paystackKey={payStack}
        amount={selectedPlan.price}
        billingEmail={email as string}
        activityIndicatorColor="green"
        channels={["bank", "card", "ussd"]}
        onLoad={() => console.log("Paystack WebView loaded")}
        onError={(error: any) =>
          console.error("Paystack WebView error:", error)
        }
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={async (res) => {
          handleSubmit(res.transactionRef.reference);
        }}
        ref={paystackWebViewRef}
      />
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Subscriptions
            </Header>
            <View />
            {/* <AntDesign
                name="pluscircle"
                size={24}
                color={colors.primary}
                onPress={() => navigation.navigate("AddSubscriptions")}
              /> */}
          </View>

          <TextPrimary
            size={13}
            font="medium"
            color={colors.gray_light}
            style={tw`mt-5`}
          >
            All your memberships ({data?.length})
          </TextPrimary>

          {/* <View style={tw`flex-row gap-5 mt-5`}>
              <View style={tw`flex-1`}>
                <InputText
                  icon={icons.search}
                  placeholder="Search"
                  style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
                />
              </View>
              <Pressable
                onPress={toggleFilterModal}
                style={tw` border border-[#484848] w-[38px] h-[36px] justify-center items-center rounded-[10px] bg-[${colors.gray_dark}]`}
              >
                <MaterialIcons name="filter-list" size={24} color="#A3A3A4" />
              </Pressable>
            </View> */}
          <View style={tw`mt-8 gap-5`}>
            {data.map((item: any, i: number) => (
              <IndSubscriptionItem
                item={item}
                key={i}
                onPress={() => setSelectedPlan(item)}
                isActive={selectedPlan.name === item.name}
              />
            ))}
          </View>

          <PrimaryButton
            style={tw`mt-6`}
            onPress={() => paystackWebViewRef?.current?.startTransaction()}
          >
            Make Payment
          </PrimaryButton>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default ViewSubscriptions;

const styles = StyleSheet.create({});
