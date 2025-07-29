import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../components/texts/header";

import TextPrimary from "../../components/texts/text";
import ImageComp from "../../components/ImageComp";
import icons from "../../utils/constants/icons";
import BackButton from "../../components/BackButton";
import {
  useGetEventRequestQuery,
  useGetSingleEventPublicQuery,
  useGetSingleEventTicketsQuery,
} from "../../state/features/services/events/events";
import PageLoader from "../../components/Loader";
import { formatDate } from "../../utils/helpers";
import moment from "moment";
// import { Barcode } from "expo-barcode-generator";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import tw from "../../lib/tailwind";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import { usePassTicketMutation } from "../../state/features/services/verification/verification";
import Toast from "react-native-toast-message";
import ErrorScreen from "../../components/ErrorScreen";

const PassTicketScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { requestId, method } = route?.params;
  const {
    data: eventRequestDetails,
    isLoading: isGettingRequest,
    refetch,
    isFetching,
    isError,
    error,
  } = useGetEventRequestQuery(requestId);
  const [passTicket, { isLoading: isPassing }] = usePassTicketMutation();
  const [refreshing, setRefreshing] = useState(false);

  if (isGettingRequest) return <PageLoader />;
  // if(error) return  <ErrorScreen message="Ticket doesnt exist" onClose={() => navigation.goBack()} />;

  const ticketDetails = eventRequestDetails?.data?.ticket;
  const eventDetails = eventRequestDetails?.data?.event;
  const eventVenue = eventDetails;
  const userDetail = eventRequestDetails?.data?.user;

  const handlePass = async () => {
    try {
      const response = await passTicket({
        eventRequestId: requestId,
        verificationMethod: method,
        eventId: eventDetails.id,
      });
      console.log(response?.error);
      if (response?.error) {
        console.log("error", response.error);
        return Alert.alert("error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.navigate("RequestSuccess", {
        title: "Ticket Verified",
        message: "Ticket Verification is successful",
      });
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

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
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={tw``}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Ticket Details
            </Header>
            <View />
          </View>

          {!eventRequestDetails ? (
            <View style={tw`justify-center items-center mt-20`}>
              <Header>Ticket Not Fount</Header>
            </View>
          ) : (
            <View style={tw`mx-3`}>
              <View
                style={[
                  tw`dark:bg-[#2E2F36] bg-[#ebeaeafc] border-[0.5px] border-[#A324F2] overflow-hidden rounded-[10px] mt-10 mx-5 pt-1`,
                ]}
              >
                <Image
                  source={{ uri: eventDetails?.image }}
                  resizeMode="cover"
                  style={tw`h-[132px] w-[132px] rounded-full mx-auto`}
                />
                <View style={tw`p-5 gap-7 `}>
                  <Header
                    size={14}
                    font="montserrat_medium"
                    style={tw`text-center`}
                  >
                    {userDetail?.firstName} {userDetail?.lastName}
                  </Header>

                  {/* <View style={tw`flex-row items-start gap-3`}>
                <ImageComp image={icons.location} />
                <View style={tw`-mt-1`}>
                  <TextPrimary size={11} color="#A6A6A6" style={tw``}>
                    Location
                  </TextPrimary>
                  <TextPrimary font="montserrat_medium" size={12}>
                    {eventVenue.name} {eventVenue.address}
                  </TextPrimary>
                </View>
              </View> */}

                  <View style={tw` flex-row justify-between`}>
                    <View style={tw`flex-row items-start gap-3`}>
                      <ImageComp image={icons.event} />
                      <View style={tw`-mt-1`}>
                        <TextPrimary
                          size={11}
                          color="#A6A6A6"
                          style={tw`text-[#A6A6A6]`}
                        >
                          Date (From)
                        </TextPrimary>
                        <TextPrimary font="montserrat_medium" size={12}>
                          {formatDate(eventDetails?.startDate)}
                        </TextPrimary>
                      </View>
                    </View>
                    <View style={tw`flex-row items-start gap-3`}>
                      <ImageComp image={icons.event} />
                      <View style={tw`-mt-1`}>
                        <TextPrimary
                          size={11}
                          color="#A6A6A6"
                          style={tw`text-[#A6A6A6]`}
                        >
                          Date (To)
                        </TextPrimary>
                        <TextPrimary font="montserrat_medium" size={12}>
                          {formatDate(eventDetails?.endDate)}
                        </TextPrimary>
                      </View>
                    </View>
                  </View>
                  <View style={tw` flex-row justify-between`}>
                    <View style={tw`flex-row items-start gap-3`}>
                      <ImageComp image={icons.clock} />
                      <View style={tw`-mt-1`}>
                        <TextPrimary
                          size={11}
                          color="#A6A6A6"
                          style={tw`text-[#A6A6A6]`}
                        >
                          Time (From)
                        </TextPrimary>
                        <TextPrimary font="montserrat_medium" size={12}>
                          {moment(eventDetails?.startDate).format("hh:mm A")}
                        </TextPrimary>
                      </View>
                    </View>
                    <View style={tw`flex-row items-start gap-3`}>
                      <ImageComp image={icons.clock} />
                      <View style={tw`-mt-1`}>
                        <TextPrimary
                          size={11}
                          color="#A6A6A6"
                          style={tw`text-[#A6A6A6]`}
                        >
                          Time (To)
                        </TextPrimary>
                        <TextPrimary font="montserrat_medium" size={12}>
                          {moment(eventDetails?.endDate).format("hh:mm A")}
                        </TextPrimary>
                      </View>
                    </View>
                  </View>

                  <View style={tw` flex-row justify-between`}>
                    <View style={tw`flex-row items-start gap-3`}>
                      <ImageComp image={icons.ticket} />
                      <View style={tw`-mt-1`}>
                        <TextPrimary
                          size={11}
                          color="#A6A6A6"
                          style={tw`text-[#A6A6A6]`}
                        >
                          Ticket Name
                        </TextPrimary>
                        <TextPrimary font="montserrat_medium" size={12}>
                          {ticketDetails?.name}
                        </TextPrimary>
                      </View>
                    </View>
                    <View style={tw`flex-row items-start gap-3`}>
                      <ImageComp image={icons.ticket} />
                      <View style={tw`-mt-1`}>
                        <TextPrimary
                          size={11}
                          color="#A6A6A6"
                          style={tw`text-[#A6A6A6]`}
                        >
                          Ticket Price
                        </TextPrimary>
                        <TextPrimary font="montserrat_medium" size={12}>
                          N {ticketDetails?.price}
                        </TextPrimary>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <PrimaryButton
                onPress={handlePass}
                loading={isPassing}
                style={tw`mx-5 mt-9 h-12`}
              >
                Pass
              </PrimaryButton>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </PageContainer>
  );
};

export default PassTicketScreen;

const styles = StyleSheet.create({});
