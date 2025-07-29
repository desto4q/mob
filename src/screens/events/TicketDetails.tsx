import { Image, ScrollView, StyleSheet, View } from "react-native";
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
import { useColorScheme } from "nativewind";
import BackButton from "../../components/BackButton";
import { useGetSingleEventTicketsQuery } from "../../state/features/services/events/events";
import PageLoader from "../../components/Loader";
import { formatDate } from "../../utils/helpers";
import moment from "moment";
// import { Barcode } from "expo-barcode-generator";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import QRCode from "react-native-qrcode-svg";
import tw from "../../lib/tailwind";

const TicketDetails = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { eventId } = route?.params;
  const { colorScheme } = useColorScheme();
  const { data, isLoading } = useGetSingleEventTicketsQuery(eventId);

  if (isLoading) return <PageLoader />;

  const ticketDetails = data?.data[0];
  const eventDetails = ticketDetails?.event;
  const eventVenue = eventDetails.venue;
  const userDetail = ticketDetails?.user;
  const ticketData = ticketDetails.ticket

  const evendData = {
    eventId,
  };


  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Ticket Details
            </Header>
            <View />
          </View>

          <View
            style={[
              tw`dark:bg-[#2E2F36] bg-[#ebeaeafc] border-[0.5px] border-[#A324F2] overflow-hidden rounded-[10px] mt-10 mx-5`,
            ]}
          >
            <Image
              source={{ uri: eventDetails?.image }}
              resizeMode="cover"
              style={tw`h-[130px] w-full rounded-t rounded-[10px]`}
            />
            <View style={tw`p-5 gap-7`}>
              <Header size={14} font="montserrat_medium">
                {eventDetails?.name}
              </Header>

              <View style={tw`flex-row items-start gap-3`}>
                <ImageComp image={icons.location} />
                <View style={tw`-mt-1`}>
                  <TextPrimary size={11} color="#A6A6A6" style={tw``}>
                    Location
                  </TextPrimary>
                  <TextPrimary font="montserrat_medium" size={12}>
                    {eventVenue.name} {eventVenue.address}
                  </TextPrimary>
                </View>
              </View>

              <View style={tw` flex-row justify-between`}>
                <View style={tw`flex-row items-start gap-3`}>
                  <ImageComp image={icons.event} />
                  <View style={tw`-mt-1`}>
                    <TextPrimary size={11} color="#A6A6A6" style={tw``}>
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
                    <TextPrimary size={11} color="#A6A6A6" style={tw``}>
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
                  <ImageComp image={icons.ticket} />
                  <View style={tw`-mt-1`}>
                    <TextPrimary size={11} color="#A6A6A6" style={tw``}>
                      Ticket Type
                    </TextPrimary>
                    <TextPrimary font="montserrat_medium" size={12}>
                      {ticketData.name}
                    </TextPrimary>
                  </View>
                </View>
                <View style={tw`flex-row items-start gap-3`}>
                  <ImageComp image={icons.ticket} />
                  <View style={tw`-mt-1`}>
                    <TextPrimary size={11} color="#A6A6A6" style={tw``}>
                      Ticket Price
                    </TextPrimary>
                    <TextPrimary font="montserrat_medium" size={12}>
                    N {ticketData?.price}
                    </TextPrimary>
                  </View>
                </View>
              </View>

              <View style={tw` flex-row justify-between`}>
                <View style={tw`flex-row items-start gap-3`}>
                  <ImageComp image={icons.clock} />
                  <View style={tw`-mt-1`}>
                    <TextPrimary size={11} color="#A6A6A6" style={tw``}>
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
                    <TextPrimary size={11} color="#A6A6A6" style={tw``}>
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
                  <ImageComp image={icons.user_icon} />
                  <View style={tw`-mt-1`}>
                    <TextPrimary size={11} color="#A6A6A6" style={tw``}>
                      Holders Name
                    </TextPrimary>
                    <TextPrimary font="montserrat_medium" size={12}>
                      {userDetail?.firstName} {userDetail?.lastName}
                    </TextPrimary>
                  </View>
                </View>
              </View>
            </View>
            {/* <View
              style={tw`border-t border-dashed border-[#15171E] pt-5 pb-5 px-5`}
            >
              <Image
                source={images.qrcode_hoz}
                resizeMode="cover"
                style={tw`w-full h-[67px]`}
              />
            </View> */}
            <View style={tw`mb-1`}>
              <TextPrimary style={tw`text-center mb-4`}>
                Request ID: {ticketDetails.id}
              </TextPrimary>
              {/* <Barcode
                value={ticketDetails.id.toString()}
                format="CODE128"
                width={0.7} // Reduce the width of each bar
                height={60}
                lineColor="#000"
                style={{ width: "100%" }}
                background={colorScheme === "dark" ? "#2E2F36" : "#ebeaeafc"}
              /> */}
              <View style={tw`mx-auto`}>
                <QRCode value={ticketDetails.id.toString()} size={150} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageContainer>
  );
};

export default TicketDetails;

const styles = StyleSheet.create({});
