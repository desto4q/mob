import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
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
import { useGetSingleEventQuery } from "../../state/features/services/events/events";
import PageLoader from "../../components/Loader";
import { formatDate } from "../../utils/helpers";

const VerifiersEventDetails = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { eventId } = route?.params;
  const { data, isLoading } = useGetSingleEventQuery(eventId);
  if (isLoading) return <PageLoader />;
  const eventDetails = data?.data;
  const venueImage = eventDetails?.venueImage && eventDetails?.venueImage;
  const eventVenue = eventDetails?.venue && eventDetails.venue;

  return (
    <>
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between `}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Event Details
            </Header>
            <View />
          </View>
          <TextPrimary
            size={11}
            font="montserrat_medium"
            color="#3F6BB9"
            style={tw`mt-5`}
          >
            {eventDetails?.category?.name}
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
                  Address: {eventVenue?.address}
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
                  7:30am - 1:00pm
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
              <PrimaryButton
                onPress={() =>
                  navigation.navigate("ViewEventVerifiers", { eventId })
                }
              >
                Manage Event Verifiers
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default VerifiersEventDetails;

const styles = StyleSheet.create({});
