import {
  FlatList,
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
import Header from "../../components/texts/header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants";
import TextPrimary from "../../components/texts/text";
import EventItem from "../../components/event/EventItem";
import images from "../../utils/constants/images";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import InvitedEvent from "../../components/event/InvitedEvent";
import EventTickets from "../../components/event/EventTickets";
import { useColorScheme } from "nativewind";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import {
  useGetEventsPublicQuery,
  useGetEventsQuery,
} from "../../state/features/services/events/events";
import PageLoader from "../../components/Loader";
import UpcomingEventListing from "../../components/event/UpcomingEventListing";

const UpcomingEvent = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState("event");

  const { data, isLoading } = useGetEventsPublicQuery();

  const eventsData = data?.data;
  console.log("eventsData", eventsData);

  if (isLoading) return <PageLoader />;

  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={tw` flex-1 mb-10`}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Upcoming Events
            </Header>
            <View />
          </View>

          <View
            style={[
              tw`px-[8px] py-[5px] flex-row rounded-[20px] mt-5 dark:bg-gray_dark bg-light`,
            ]}
          >
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "event" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("event")}
            >
              <TextPrimary size={11}>Events</TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "invite" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("invite")}
            >
              <TextPrimary size={11}>Invited Events</TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "ticket" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("ticket")}
            >
              <TextPrimary size={11}>Tickets</TextPrimary>
            </Pressable>
          </View>
          {tab === "event" && <UpcomingEventListing navigation={navigation} />}

          {tab === "invite" && <InvitedEvent navigation={navigation} />}
          {tab === "ticket" && <EventTickets navigation={navigation} />}
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

export default UpcomingEvent;

const styles = StyleSheet.create({});
