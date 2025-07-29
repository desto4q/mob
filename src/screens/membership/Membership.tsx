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
import CardAction from "../../components/CardAction";
import icons from "../../utils/constants/icons";
import images from "../../utils/constants/images";
import { useGetUserQuery } from "../../state/features/services/users/user";

const Membership = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { data } = useGetUserQuery();
  const { accountType } = (data?.data as any) || {};

  console.log("accountType", accountType === "Individual");

  return (
    <PageContainer>
      <ScrollView style={tw`flex-1 `}>
        <View style={tw`flex-row items-center gap-4 `}>
          <ShadowGradient onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
          </ShadowGradient>
          <Header font="semi_bold">Membership & Subscription</Header>
        </View>
        {accountType === "Individual" && (
          <View style={tw`flex-1 gap-5 mt-10 pb-12`}>
            <CardAction
              icon={icons.membership}
              title="Membership"
              text="View all your memberships "
              sideIcon={images.membership_right}
              onPress={() => navigation.navigate("ViewMemberships")}
            />
            <CardAction
              icon={icons.subscription}
              title="General Subscription"
              text="Manage subscription plans"
              sideIcon={images.subscription_right}
              onPress={() => navigation.navigate("IndGeneralSubscription")}
            />
            {/* <CardAction
                icon={icons.subscription}
                title="Subscription"
                text="See organisations your are subscribed too"
                sideIcon={images.subscription_right}
                onPress={() => navigation.navigate("ViewSubscriptions")}
              /> */}
            <CardAction
              icon={icons.pending}
              title="Pending Requests"
              text="All your pending membership requests"
              sideIcon={images.pending_right}
              onPress={() => navigation.navigate("PendingRequest")}
            />
            <CardAction
              icon={icons.pending}
              title="SubScribe to Organization"
              text="Subscribe to an Organization"
              sideIcon={images.pending_right}
              onPress={() => navigation.navigate("SubscribeOrganization")}
            />
            <CardAction
              icon={icons.pending}
              title="All Subscriptions"
              text="View all active subscriptions, and subscription History"
              sideIcon={images.pending_right}
              onPress={() => navigation.navigate("AllSubscriptions")}
            />
          </View>
        )}

        {accountType === "Organization" && (
          <View style={tw`flex-1 gap-5 mt-10`}>
            <CardAction
              icon={icons.membership}
              title="Membership"
              text="View and manage all members and of your organisation"
              sideIcon={images.membership_right}
              onPress={() => navigation.navigate("OrgMembershipList")}
            />
            <CardAction
              icon={icons.membership}
              title="Blacklisted Members"
              text="View and manage all blacklisted members"
              sideIcon={images.membership_right}
              onPress={() => navigation.navigate("OrgBlacklistedMembers")}
            />
            <CardAction
              icon={icons.subscription}
              title="Subscription"
              text="Create and manage subscription plans and subscribers of your organisation"
              sideIcon={images.subscription_right}
              onPress={() => navigation.navigate("OrgSubscription")}
            />
            <CardAction
              icon={icons.subscription}
              title="Designations"
              text="Manage Designations"
              sideIcon={images.subscription_right}
              onPress={() => navigation.navigate("ViewDesignations")}
            />
            <CardAction
              icon={icons.pending}
              title="Subscription Log"
              text="History of subscribers and subscriptions"
              sideIcon={images.pending_right}
              onPress={() => navigation.navigate("SubscriptionLogs")}
            />
          </View>
        )}
      </ScrollView>
    </PageContainer>
  );
};

export default Membership;

const styles = StyleSheet.create({});
