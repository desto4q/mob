import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ShadowGradient from "../../components/ShadowGradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import tw from "twrnc";
import images from "../../utils/constants/images";
import VerificationAction from "../../components/verifcation/VerificationAction";
import { useGetUserQuery } from "../../state/features/services/users/user";

const EventOverview = ({ navigation }: any) => {
  const { data } = useGetUserQuery();
  const { accountType } = (data?.data as any) || {};

  return (
    <PageContainer>
      <SafeAreaView style={{}}>
        <ScrollView style={tw``}>
          <View style={tw`flex-row items-center justify-between gap-4`}>
            <ShadowGradient onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="white"
              />
            </ShadowGradient>
            <Header font="semi_bold">Event Management</Header>
            <View />
          </View>

          {accountType === "Individual" && (
            <View style={tw`gap-5 mt-10`}>
              <VerificationAction
                title="Create Event"
                text="Lets help you set up your event in few steps"
                image={images.create_event}
                onPress={() => navigation.navigate("CreateEvent")}
              />
              <VerificationAction
                title="My Events"
                text="See all events you created by you"
                image={images.invites}
                onPress={() => navigation.navigate("AllEvents")}
              />
              <VerificationAction
                title="Up Coming Events"
                text="2 Events"
                image={images.all_verification}
                onPress={() => navigation.navigate("UpcomingEvent")}
              />
              {/* <VerificationAction
            title="View Verification Request"
            text="2 Requests"
            image={images.all_verification}
            onPress={() => navigation.navigate("VerificationRequest")}
          /> */}
              <VerificationAction
                title="Event Gallery"
                text="Look through a wide variety of events"
                image={images.gallery}
                onPress={() => navigation.navigate("EventGallery")}
              />
              <VerificationAction
                title="Event Invites"
                text="See all invitations from your friends and others"
                image={images.invites}
                onPress={() => navigation.navigate("EventInvites")}
              />
              <VerificationAction
                title="History"
                text="All your previous events"
                image={images.history}
                onPress={() => navigation.navigate("EventHistory")}
              />
            </View>
          )}

          {accountType === "Organization" && (
            <View style={tw`gap-5 mt-10`}>
              <VerificationAction
                title="Up Coming Events"
                text="2 Events"
                image={images.all_verification}
                onPress={() => navigation.navigate("UpcomingEvent")}
              />
              <VerificationAction
                title="My Events"
                text="See all events you created by you"
                image={images.invites}
                onPress={() => navigation.navigate("AllEvents")}
              />
              <VerificationAction
                title="Create Event"
                text="Lets help you set up your event in few steps"
                image={images.create_event}
                onPress={() => navigation.navigate("CreateEvent")}
              />

              {/* <VerificationAction
            title="View Verification Request"
            text="2 Requests"
            image={images.all_verification}
            onPress={() => navigation.navigate("VerificationRequest")}
          /> */}
              <VerificationAction
                title="Event Gallery"
                text="Look through a wide variety of events"
                image={images.gallery}
                onPress={() => navigation.navigate("EventGallery")}
              />

              {/* <VerificationAction
            title="History"
            text="All your previous events"
            image={images.history}
            onPress={() => navigation.navigate("EventHistory")}
          /> */}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </PageContainer>
  );
};

export default EventOverview;

const styles = StyleSheet.create({});
