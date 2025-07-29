import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import tw from "twrnc";
import Header from "../../components/texts/header";
import { colors } from "../../utils/constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextPrimary from "../../components/texts/text";
import BuyTicketItem from "../../components/event/BuyTicketItem";
import BackButton from "../../components/BackButton";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import {
  useGetPaymentGatewayQuery,
  useGetUserQuery,
} from "../../state/features/services/users/user";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import { useClaimEventTicketMutation } from "../../state/features/services/events/events";
import Toast from "react-native-toast-message";
import PageLoader from "../../components/Loader";

export interface Ticket {
  id: number;
  name: string;
  price: string;
  ticketsAvailable: number;
}

const BuyTicket = ({ navigation, route }: any) => {
  const { tickets: tiks, eventId } = route?.params;
  const tickets = tiks as Ticket[];
  const insets = useSafeAreaInsets();
  // console.log(filterData.active);
  const { data: gateWay, isLoading: isLoadingGateway } =
    useGetPaymentGatewayQuery();
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  const [claimTicket, { isLoading: isClaiming }] =
    useClaimEventTicketMutation();
  const {
    data,
    isLoading: isGettingUser,
    refetch,
    isFetching,
  } = useGetUserQuery();

  const { email } = data?.data || {};

  if (isLoadingGateway) return <PageLoader />;

  const payStack = gateWay?.data?.publicKey || gateWay?.data?.data?.publicKey;

  const handleSubmit = async (refID: string) => {
    try {
      const response = await claimTicket({
        eventId: eventId,
        ticketId: selectedTicket.id.toString(),
        refID,
      });
      console.log(response?.error);
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
      navigation.goBack();
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
        amount={selectedTicket.price}
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
      <PageContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={tw``}>
            <View style={tw` flex-row justify-between`}>
              <BackButton onPress={() => navigation.goBack()} />
              <Header font="semi_bold" size={16}>
                Buy Ticket
              </Header>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="#C4C4C4"
              />
            </View>

            <View style={tw`mt-8`}>
              <TextPrimary font="medium" color={colors.gray_light}>
                Choose A Ticket Type
              </TextPrimary>
              <View style={tw`mt-5 gap-4`}>
                {
                  tickets.map((ticket, index) => (
                    <BuyTicketItem
                      {...ticket}
                      key={index}
                      isActive={selectedTicket.name === ticket.name}
                      onPress={() => setSelectedTicket(ticket)}
                    />
                  )) // ticket.map ends here  //
                }
              </View>

              <PrimaryButton
                style={tw`mt-6`}
                onPress={() => paystackWebViewRef?.current?.startTransaction()}
              >
                Make Payment
              </PrimaryButton>
            </View>
          </ScrollView>
        </SafeAreaView>
      </PageContainer>
    </>
  );
};

export default BuyTicket;

const styles = StyleSheet.create({});
