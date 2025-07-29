import {
  Alert,
  FlatList,
  Pressable,
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
  useGetOrganizationSubDetailsQuery,
  useGetPaymentGatewayQuery,
  useGetUserQuery,
  useOrgGeneralsubscribeMutation,
} from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";
import TextPrimary from "../../components/texts/text";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import Toast from "react-native-toast-message";

const GeneralSubscriptionDetails = ({ navigation, route }: any) => {
  const { id } = route?.params;
  const { data: subDetails, isLoading } = useGetOrganizationSubDetailsQuery(id);

  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const { data: userData, isLoading: isGettingUser } = useGetUserQuery();
  const { data: gateWay, isLoading: isLoadingGateway } =
    useGetPaymentGatewayQuery();
  const [planId, setPlanId] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [startTransaction, setStartTransaction] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<null | {
    planId: string;
    amount: number;
  }>(null);

  const subData = subDetails?.data;

  const payStack = gateWay?.data?.publicKey;

  useEffect(() => {
    if (pendingPayment?.planId && pendingPayment.amount) {
      setPlanId(pendingPayment.planId);
      setSelectedAmount(pendingPayment.amount);

      // Start transaction only when both are guaranteed to be updated
      setTimeout(() => {
        paystackWebViewRef?.current?.startTransaction();
      }, 100); // short delay ensures Paystack picks up the correct amount

      // Clear the state
      setPendingPayment(null);
    }
  }, [pendingPayment]);

  const [subscribe, { isLoading: isSubscribing }] =
    useOrgGeneralsubscribeMutation();

  const { email } = userData?.data || {};

  if (isLoading || isGettingUser || isLoadingGateway) return <PageLoader />;

  const handleSubscribe = async (refID: string) => {
    console.log("Subscribing to plan:", planId);
    try {
      const response = await subscribe({
        planId: planId,
        refId: refID,
        autoRenew: true,
      });
      console.log(response?.error);
      if (response?.error) {
        return Alert.alert(
          response?.error?.data?.message || "An error occurred",
        );
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.goBack();
      navigation.navigate("RequestSuccess");
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const renderPlan = ({ item }: any) => (
    <View
      style={tw`w-full mt-5 p-4 border border-gray-200 rounded-2xl bg-[#E9EBFC8A] dark:bg-[#2E2F36] shadow-sm`}
    >
      <Header font="unbounded_semibold" style={tw`text-lg font-semibold `}>
        {item.name}
      </Header>
      <TextPrimary style={tw`text-sm text-gray-600 mt-2`}>
        ₦{item.amount} / {item.duration}{" "}
        {item.duration > 1 ? "months" : "month"}
      </TextPrimary>

      <View style={tw`mt-3 gap-3`}>
        <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
          Max Staffs: {item.maxStaffs}
        </TextPrimary>
        <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
          Event Limit: {item.eventLimit}
        </TextPrimary>
        <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
          Customized Templates: {item.customizedTemplateLimit}
        </TextPrimary>
        <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
          Verifiers/Event: {item.verifiersPerEvent}
        </TextPrimary>
        <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
          Private Events: {item.accessPrivateEvent ? "Yes" : "No"}
        </TextPrimary>
        <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
          Support: {item.emailSupport}
        </TextPrimary>
      </View>

      <PrimaryButton
        disabled={item.isActive}
        style={tw`mt-4`}
        onPress={() => {
          setPendingPayment({ planId: item.id, amount: item.amount });
        }}
      >
        {item.isActive ? "Current Plan" : "Subscribe"}
      </PrimaryButton>
    </View>
  );

  return (
    <>
      <Paystack
        paystackKey={payStack}
        amount={selectedAmount}
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
          console.log("response", res);
          handleSubscribe(res.data.transactionRef.reference);
          // try {
          //   await fundUserWallet({
          //     amount: amount,
          //     payStackreference: res.data.transactionRef.trxref,
          //   }).unwrap();
          //   showToast(`${amount} has been added to your wallet`);
          //   navigation.navigate("Wallet");
          // } catch (error: any) {
          //   Toast.show(error.data.message ?? "Oops! An error occured!", {
          //     duration: 5000,
          //     backgroundColor: "red",
          //   });
          // }
        }}
        ref={paystackWebViewRef}
      />
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw`flex-row justify-between items-center`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Organization Subscription
            </Header>
            <View />
          </View>

          <TextPrimaryPrimary
            size={13}
            font="medium"
            color={colors.gray_light}
            style={tw`mt-5 `}
          >
            Subscription plan details
          </TextPrimaryPrimary>

          <View style={tw`mt-3`}>
            <View
              style={tw`w-full mt-5 p-4  rounded-2xl bg-[#E9EBFC8A] dark:bg-[#2E2F36] shadow-sm`}
            >
              <Header
                font="unbounded_semibold"
                style={tw`text-lg font-semibold`}
              >
                {subData.name}
              </Header>

              <TextPrimary style={tw`text-sm text-gray-600 mt-2`}>
                ₦{subData.amount} / {subData.duration}{" "}
                {subData.duration > 1 ? "months" : "month"}
              </TextPrimary>

              <View style={tw`mt-3 gap-3`}>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Max Staffs: {subData.maxStaffs}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Organization User Limit: {subData.organizationUserLimit}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Event Limit: {subData.eventLimit}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Customized Templates: {subData.customizedTemplateLimit}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Verifiers/Event: {subData.verifiersPerEvent}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Private Events: {subData.accessPrivateEvent ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Semi-Private Events:{" "}
                  {subData.accessSemiPrivateEvent ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Free Events Only: {subData.freeEventsOnly ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Recurring Events: {subData.recurringEvents ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Can Appoint Verifiers:{" "}
                  {subData.canAppointVerifiers ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Subscription Management:{" "}
                  {subData.subscriptionManagement ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Default Template: {subData.defaultTemplate ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Event Logs: {subData.hasEventLogs ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Dedicated Support: {subData.dedicated_support ? "Yes" : "No"}
                </TextPrimary>
                <TextPrimary font="semi_bold" style={tw`text-xs text-gray-500`}>
                  Email Support: {subData.emailSupport}
                </TextPrimary>
              </View>

              {subData.amount !== "0" && (
                <PrimaryButton
                  disabled={subData.active || subData.amount === "0"}
                  style={tw`mt-4`}
                  onPress={() => {
                    setPendingPayment({
                      planId: subData.id,
                      amount: subData.amount,
                    });
                  }}
                >
                  {subData.active ? "Current Plan" : "Subscribe"}
                </PrimaryButton>
              )}
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default GeneralSubscriptionDetails;

const styles = StyleSheet.create({});
