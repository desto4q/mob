import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import BaseText from "../../components/BaseText";
import PageContainer from "../../components/PageContainer";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import PageLoader from "../../components/Loader";
import BackButton from "../../components/BackButton";
import tw from "../../lib/tailwind";
import Header from "../../components/texts/header";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import {
  useGetPaymentGatewayQuery,
  useGetUserQuery,
} from "../../state/features/services/users/user";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

interface CompanyAddress {
  country: string;
  state: string;
  street: string;
}

interface OrgProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  emailVerifiedAt: string;
  dateOfBirth: string | null;
  phoneNumber: string;
  accountType: "Organization" | "Individual";
  aboutCompany: string;
  natureOfOrganization: string;
  companyName: string;
  companyEmail: string;
  companyAddress: CompanyAddress;
  photo: string;
  wallet: string;
  mobiHolderId: string;
  isVerified: boolean;
  isSuperAdmin: boolean;
  status: "active" | "inactive" | string;
  acceptedTnC: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PlanData {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  organizationId: string;
  durationInDays: number;
  createdAt: string;
  validity: number;
}

interface ApiResponse {
  code: number;
  data: PlanData[];
}

export default function SubscribeDetails({ route }: any) {
  const { item } = route.params;
  const orgItem = item as OrgProfile;
  const [selected, setSelected] = useState<PlanData | null>(null);
  const query = useQuery<ApiResponse>({
    queryKey: ["orgPlans", orgItem.id],
    queryFn: async () => {
      let resp = await newApi.get(
        `/api/memberships-subscriptions/organization/subscription/plans?organizationId=${orgItem.id}`,
      );
      return resp.data;
    },
  });
  const {
    data,
    isLoading: isGettingUser,
    refetch,
    isFetching,
  } = useGetUserQuery();
  const { data: gateWay, isLoading: isLoadingGateway } =
    useGetPaymentGatewayQuery();
  const paystackWebViewRef = useRef<paystackProps.PayStackRef | undefined>(
    undefined,
  );
  const payStack = gateWay?.data?.publicKey || gateWay?.data?.data?.publicKey;
  if (query.isLoading || isLoadingGateway) return <PageLoader />;

  if (query.isError) {
    return (
      <PageContainer style={tw`flex-1 `}>
        <BackButton />
        <View style={tw`flex-1 justify-center items-center px-6`}>
          <View
            style={tw` rounded-2xl p-8 shadow-lg border border-red-100 max-w-sm w-full`}
          >
            {/* Error Icon */}
            <View
              style={tw`w-16 h-16 bg-red-100 rounded-full items-center justify-center mx-auto mb-4`}
            >
              <BaseText style={tw`text-red-500 text-2xl font-bold`}>!</BaseText>
            </View>

            <BaseText
              style={tw`text-xl font-bold text-gray-800 text-center mb-3`}
            >
              Oops! Something went wrong
            </BaseText>

            <BaseText
              style={tw`text-gray-600 text-center text-base leading-6 mb-6`}
            >
              We couldn't load subscription plans for {orgItem.companyName}.
              Please check your connection and try again.
            </BaseText>

            {query.error instanceof Error && (
              <BaseText
                style={tw`text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg`}
              >
                {query.error.message}
              </BaseText>
            )}

            <PrimaryButton style={tw`mt-4`} onPress={query.refetch}>
              Reload
            </PrimaryButton>
          </View>
        </View>
      </PageContainer>
    );
  }

  const plans = query.data?.data || [];
  interface MEMBERSHIP_RESPONSE {
    code: number;
    message: string;
    data: Membership[];
  }
  interface OrganizationAddress {
    state: string;
    street: string;
    country: string;
  }

  interface Organization {
    isVerified: boolean;
    id: string;
    mobiHolderId: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerifiedAt: string;
    username: string;
    phoneNumber: string;
    dateOfBirth: string;
    companyName: string;
    companyAddress: OrganizationAddress;
    companyEmail: string;
    aboutCompany: string;
    natureOfOrganization: string;
    isSuperAdmin: boolean;
    accountType: string;
    acceptedTnC: boolean;
    photo: string;
    wallet: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Membership {
    id: number;
    individualId: string;
    organizationId: string;
    memberId: string;
    organizationEmail: string;
    designation: string;
    status: string;
    requestedBy: string;
    dateJoined: string;
    leftReason: string;
    leftAt: string;
    createdAt: string;
    updatedAt: string;
    organization: Organization;
  }
  const formatDuration = (days: number) => {
    if (days === 365) return "year";
    if (days === 30) return "month";
    if (days % 30 === 0) return `${days / 30} months`;
    return `${days} days`;
  };
  const { email } = data?.data || {};
  const handleSubmit = async (e: string) => {
    if (!selected) return;

    try {
      const response = await newApi.post(
        "/api/memberships-subscriptions/subscribe",
        {
          organizationId: selected.organizationId,
          planId: selected.id,
          refId: e,
        },
      );
      Toast.show({
        text1: "subscribed",
        type: "success",
      });
    } catch (err) {
      console.log(JSON.stringify(err.response.data));
      Toast.show({
        text1: err.response.data.message,
        type: "error",
      });
    }
  };
  return (
    <View style={tw`flex-1`}>
      <Paystack
        paystackKey={payStack}
        amount={selected?.price || 0}
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
          handleSubmit(res.data.transactionRef.reference);
        }}
        ref={paystackWebViewRef}
      />
      <PageContainer style={tw``} padding={0}>
        <View
          style={tw`rounded-b-xl  shadow-sm dark:bg-gray_dark bg-white px-4 py-4`}
        >
          <View style={tw`flex-row items-center mb-4`}>
            <BackButton />
            <View style={tw`flex-1 ml-4`}>
              <BaseText style={tw`text-lg text-gray-500 dark:text-gray-400`}>
                Subscribe to
              </BaseText>
              <BaseText
                style={tw`text-2xl font-bold text-gray-800 dark:text-white`}
              >
                {orgItem.companyName}
              </BaseText>
            </View>
          </View>
        </View>
        {/* Plans Section */}
        <View style={tw`flex-1 px-4 py-6 `}>
          {plans.length > 0 ? (
            <>
              <ScrollView
                contentContainerStyle={tw`pb-8`}
                showsVerticalScrollIndicator={false}
              >
                {plans.map((plan, index) => {
                  const isPopular = index === 1 && plans.length > 2;
                  return (
                    <View
                      key={plan.id}
                      style={[
                        tw`mb-6 mx-2 bg-white dark:bg-gray_dark rounded-2xl overflow-hidden`,
                        {
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.12,
                          shadowRadius: 24,
                          elevation: 16,
                        },
                      ]}
                    >
                      {/* Header with gradient background */}
                      <View
                        style={tw`px-6 pt-6 pb-4 bg-gradient-to-r from-primary to-primary-600`}
                      >
                        <View
                          style={tw`flex-row items-center justify-between mb-2`}
                        >
                          <BaseText style={tw`text-xl font-bold`}>
                            {plan.name}
                          </BaseText>
                          <View style={tw`bg-gray/20 px-3 py-1 rounded-full`}>
                            <BaseText style={tw`text-sm font-medium`}>
                              {plan.validity} Month
                              {plan.validity > 1 ? "s" : ""}
                            </BaseText>
                          </View>
                        </View>

                        {/* Price section */}
                        <View style={tw`flex-row items-baseline`}>
                          <BaseText style={tw`text-3xl font-bold `}>
                            ₦{plan.price.toLocaleString()}
                          </BaseText>
                          <BaseText style={tw` text-base ml-2`}>
                            /
                            {plan.validity > 1
                              ? `${plan.validity} months`
                              : "month"}
                          </BaseText>
                        </View>
                      </View>

                      {/* Content section */}
                      <View style={tw`px-6 py-5`}>
                        {/* Description */}
                        <BaseText
                          style={tw`text-neutral-500 dark:text-neutral-300 text-base leading-6 mb-6`}
                        >
                          {plan.description}
                        </BaseText>

                        {/* Features section - you can add features array to plan object */}

                        {/* Subscribe button */}
                        <TouchableOpacity
                          onPress={async () => {
                            setSelected(plan);

                            const membershipRes =
                              await newApi.get<MEMBERSHIP_RESPONSE>(
                                `/api/memberships-subscriptions/individual/membership?filter=active&search=$${orgItem.mobiHolderId}`,
                              );

                            const isMember = membershipRes.data.data.some(
                              (m) =>
                                m.organizationId === selected.organizationId,
                            );

                            if (!isMember) {
                              Toast.show({
                                text1:
                                  "You must be a member of this organization to subscribe.",
                                type: "error",
                              });
                              return;
                            }
                            if (!paystackWebViewRef.current) return;
                            paystackWebViewRef.current?.startTransaction();
                          }}
                          style={[
                            tw`rounded-xl py-4 px-6 bg-primary`,
                            {
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.1,
                              shadowRadius: 12,
                              elevation: 8,
                            },
                          ]}
                        >
                          <View
                            style={tw`flex-row items-center justify-center`}
                          >
                            <BaseText
                              style={tw`text-white text-lg font-semibold mr-2`}
                            >
                              Get Started
                            </BaseText>
                            <View
                              style={tw`w-5 h-5 bg-white/20 rounded-full items-center justify-center`}
                            >
                              <BaseText style={tw`text-white text-xs`}>
                                →
                              </BaseText>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Bottom accent line */}
                      <View
                        style={tw`h-1 bg-gradient-to-r from-primary to-primary-600`}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </>
          ) : (
            /* Empty State */
            <View style={tw`flex-1 justify-center items-center px-6`}>
              <View
                style={tw`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-sm w-full`}
              >
                {/* Empty State Icon */}
                <View
                  style={tw`w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center mx-auto mb-6`}
                >
                  <BaseText style={tw`text-gray-400 text-3xl`}>📋</BaseText>
                </View>

                <BaseText
                  style={tw`text-xl font-bold text-gray-800 dark:text-white text-center mb-4`}
                >
                  No Plans Available
                </BaseText>

                <BaseText
                  style={tw`text-gray-600 dark:text-gray-400 text-center text-base leading-6`}
                >
                  {orgItem.companyName} hasn't set up any subscription plans
                  yet. Check back later!
                </BaseText>
              </View>
            </View>
          )}
        </View>
      </PageContainer>
    </View>
  );
}
