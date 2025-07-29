import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Share,
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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import icons from "../../utils/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ListItem from "../../components/ListItem";
import images from "../../utils/constants/images";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants";
import EventImage from "../../components/EventImage";
import CardTag from "../../components/CardTag";
import DrawerIcon from "../../components/DrawerIcon";
import ListItemSmall from "../../components/ListItemSmall";
import BackButton from "../../components/BackButton";
import tw from "../../lib/tailwind";
import {
  useClaimEventTicketMutation,
  useDeleteEventMutation,
  useEventTicketRequestMutation,
  useGetSingleEventPublicQuery,
  useGetSingleEventQuery,
} from "../../state/features/services/events/events";
import PageLoader from "../../components/Loader";
import BottomModals from "../../components/modals/BottomModals";
import Toast from "react-native-toast-message";
import { formatDate } from "../../utils/helpers";
import moment from "moment";
import { useGetUserQuery } from "../../state/features/services/users/user";
import { useSendVerificationRequestMutation } from "../../state/features/services/verification/verification";

const EventDetailsPublic = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { eventId } = route?.params;
  const [dropdown, setDropdown] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const { data: userData } = useGetUserQuery();
  const { accountType } = (userData?.data as any) || {};
  const { data, isLoading } = useGetSingleEventPublicQuery(eventId);
  const [sendRequest, { isLoading: isSendingRequest }] =
    useSendVerificationRequestMutation();

  const [claimTicket, { isLoading: isClaiming }] =
    useClaimEventTicketMutation();

  if (isLoading) return <PageLoader />;
  if (isSendingRequest)
    return <PageLoader message="Sending Request... Pls Wait " />;

  const eventDetails = data?.data;

  console.log("eventDetails", eventDetails);

  const venueImage = eventDetails?.venueImage;
  const eventVenue = eventDetails?.venue;

  const handleSubmit = async () => {
    try {
      const response = await claimTicket({
        eventId: eventDetails.id.toString(),
        ticketId: eventDetails?.eventtickets[0].id.toString(),
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

  const handleSendRequest = async () => {
    try {
      const response = await sendRequest({
        eventId,
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
      // navigation.goBack();
      navigation.navigate("RequestSuccess", {
        title: "Request Send!",
        message: "Your request to become a verifier has been successfully sent",
      });
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const url = `https://mobi-holder.netlify.app/app/upcoming-events/event/${eventDetails?.id}`;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hello, I'm inviting you to " + eventDetails?.name + "\n" + url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <PageContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={tw``}>
            <View style={tw` flex-row justify-between `}>
              <BackButton onPress={() => navigation.goBack()} />
              <Header font="semi_bold" size={16}>
                Event Details
              </Header>
              <MaterialCommunityIcons
                onPress={() => setDropdown(!dropdown)}
                name="dots-vertical"
                size={24}
                color="#C4C4C4"
              />
            </View>
            {dropdown && (
              <View
                style={tw`bg-[#3A3A3C] rounded-[10px] p-3 gap-3 w-[181px] absolute z-50 right-0 top-10`}
              >
                {/* <TextPrimary size={12} font="medium" style={tw`text-gray`}>
                  Action{" "}
                </TextPrimary> */}

                {accountType === "Individual" && (
                  <Pressable onPress={handleSendRequest}>
                    <TextPrimary
                      size={11}
                      font="medium"
                      style={tw`text-[#EEEEEE]`}
                    >
                      Request to be a Verifier
                    </TextPrimary>
                  </Pressable>
                )}
                <Pressable onPress={onShare}>
                  <TextPrimary
                    size={11}
                    font="medium"
                    style={tw`text-[#EEEEEE]`}
                  >
                    Share
                  </TextPrimary>
                </Pressable>
              </View>
            )}

            <TextPrimary
              size={11}
              font="montserrat_medium"
              color="#3F6BB9"
              style={tw`mt-5`}
            >
              EDUCATION
            </TextPrimary>
            <TextPrimary size={16} font="montserrat_semibold" style={tw`mt-5`}>
              {eventDetails?.name}
            </TextPrimary>
            <View style={tw`mt-5`}>
              <EventImage item={eventDetails} />
            </View>
            <View style={tw`my-5 gap-4`}>
              <CardTag
                text={`Type : ${eventDetails?.accessType}`}
                color="#438226"
                bgColor="#204E0A1A"
              />
              <TextPrimary>{eventDetails?.description}</TextPrimary>
            </View>
            <View style={tw`mt-2 pb-10 `}>
              <View style={tw` gap-4`}>
                <ListItemSmall showArrow={false} icon={icons.tab_icon1}>
                  <TextPrimary font="montserrat_regular" style={{ flex: 1 }}>
                    Venue: {eventVenue?.name}
                  </TextPrimary>
                </ListItemSmall>
                <ListItemSmall showArrow={false} icon={icons.location}>
                  <TextPrimary font="montserrat_regular" style={{ flex: 1 }}>
                    Address: {eventVenue.address}
                  </TextPrimary>
                </ListItemSmall>
                <ListItemSmall showArrow={false} icon={icons.card_number}>
                  <TextPrimary font="montserrat_regular">
                    Event ID : 102358594
                  </TextPrimary>
                </ListItemSmall>
                <ListItemSmall showArrow={false} icon={icons.event}>
                  <TextPrimary font="montserrat_regular">
                    Start: {formatDate(eventDetails?.startDate)}
                  </TextPrimary>
                </ListItemSmall>
                <ListItemSmall showArrow={false} icon={icons.event}>
                  <TextPrimary font="montserrat_regular">
                    End: {formatDate(eventDetails?.endDate)}
                  </TextPrimary>
                </ListItemSmall>
                <ListItemSmall showArrow={false} icon={icons.clock}>
                  <TextPrimary font="montserrat_regular">
                    {moment(eventDetails?.startDate).format("hh:mm A")} -{" "}
                    {moment(eventDetails?.endDate).format("hh:mm A")}
                  </TextPrimary>
                </ListItemSmall>
                <ListItemSmall showArrow={false} icon={icons.ticket}>
                  <TextPrimary font="montserrat_regular">
                    {eventDetails?.ticketType}
                  </TextPrimary>
                </ListItemSmall>
              </View>
              <View style={tw` mt-8`}>
                <TextPrimary
                  font="montserrat_regular"
                  style={tw` dark:text-gray_light`}
                >
                  Location Photos
                </TextPrimary>
                <FlatList
                  data={venueImage}
                  renderItem={({ item }) =>
                    item && (
                      <View style={tw`my-1 mr-3`}>
                        <Image
                          resizeMode="cover"
                          source={{ uri: item }}
                          style={tw`h-[76px] w-[94px] rounded-[10px]`}
                        />
                      </View>
                    )
                  }
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={tw`mt-3`}
                />
              </View>
              <View style={tw`mt-10`}>
                {eventDetails?.ticketType === "Free" && (
                  <PrimaryButton onPress={handleSubmit} loading={isClaiming}>
                    Claim Ticket
                  </PrimaryButton>
                )}
                {eventDetails?.ticketType === "Paid" && (
                  <PrimaryButton
                    onPress={() =>
                      navigation.navigate("BuyTicket", {
                        tickets: eventDetails.eventtickets,
                        eventId: eventDetails.id.toString(),
                      })
                    }
                    loading={isClaiming}
                  >
                    Buy Ticket
                  </PrimaryButton>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </PageContainer>
      <BottomModals open={modal} handleClose={toggleModal} snapPoints={["50"]}>
        <View style={tw`p-5`}>
          {/* <View style={tw`h-[2px] w-[80px] rounded-sm bg-[#606060] mx-auto`} /> */}
          <TextPrimary font="medium" size={15} style={tw`text-center mt-5`}>
            Delete Event
          </TextPrimary>
          <View style={tw`gap-5 mt-6`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <TextPrimary>Note: This action cannot be reversed⚠️</TextPrimary>
            </View>

            <PrimaryButton
              size={13}
              style={tw``}
              loading={isClaiming}
              onPress={handleSubmit}
              color="#F74D1B"
            >
              Delete
            </PrimaryButton>
          </View>
        </View>
      </BottomModals>
    </>
  );
};

export default EventDetailsPublic;

const styles = StyleSheet.create({});
