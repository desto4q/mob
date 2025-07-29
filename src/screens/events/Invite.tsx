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
import InvitationListing from "../../components/event/InvitationListing";
import InvitationItem from "../../components/event/InvitationItem";
import TicketRequestItem from "../../components/event/TicketRequestItem";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import TicketRequestListing from "../../components/event/TicketRequestListing";
import EventLogsListing from "../../components/event/EventLogsListing";

const Invite = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState("invitations");
  const { eventId } = route?.params;

  return (
    <PageContainer padding="0%">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={tw`flex-1`}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Invite
            </Header>
            <View />
          </View>

          <View
            style={tw`px-[8px] py-[5px] flex-row  bg-light dark:bg-gray_dark rounded-[20px] mt-5 mx-[5%]`}
          >
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "invitations" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("invitations")}
            >
              <TextPrimary size={11}>Invitations</TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "event_log" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("event_log")}
            >
              <TextPrimary size={11}>Event Logs</TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "ticket_request" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("ticket_request")}
            >
              <TextPrimary size={11}>Tickets Requests</TextPrimary>
            </Pressable>
          </View>

          <View style={tw` mt-6  flex-1`}>
            {tab === "invitations" && (
              <View style={tw``}>
                <InvitationListing navigation={navigation} eventId={eventId} />
              </View>
            )}

            {tab === "event_log" && (
              <EventLogsListing navigation={navigation} eventId={eventId} />
            )}
            {tab === "ticket_request" && (
              <TicketRequestListing navigation={navigation} eventId={eventId} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

export default Invite;

const styles = StyleSheet.create({});
