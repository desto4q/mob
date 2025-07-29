import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../components/texts/header";

import { colors } from "../../utils/constants";
import TextPrimary from "../../components/texts/text";
import EventItem from "../../components/event/EventItem";
import images from "../../utils/constants/images";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import EventVerifiersItem from "../../components/verifcation/EventVerifiersItem";
import MembershipPendingRequest from "../../components/MembershipPendingRequest";
import MembershipInvites from "../../components/MembershipInvites";
import {
  useGetUserMembershipQuery,
  useGetUserOrganizationMembershipQuery,
} from "../../state/features/services/membership/membership";
import OrgMembershipItem from "../../components/membership/OrgMembershipItem";
import MembershipListing from "../../components/membership/MembershipListing";

const OrgMembershipList = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<"membership" | "request" | "invites">(
    "membership",
  );

  return (
    <PageContainer padding="0%">
      <View style={tw`flex-1  pb-10`}>
        <View style={tw` flex-row justify-between px-[5%]`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Membership
          </Header>
          <AntDesign
            name="pluscircle"
            size={24}
            color={colors.primary}
            onPress={() => navigation.navigate("InviteNewMember")}
          />
        </View>

        <View style={tw`px-[5%]`}>
          <View
            style={[
              tw`px-[8px] py-[5px] flex-row rounded-[20px] mt-5 dark:bg-gray_dark bg-light`,
            ]}
          >
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "membership" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("membership")}
            >
              <TextPrimary
                size={11}
                style={[tab === "membership" ? { color: "#fff" } : {}]}
              >
                Memebership
              </TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "request" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("request")}
            >
              <TextPrimary
                size={11}
                style={[tab === "request" ? { color: "#fff" } : {}]}
              >
                Pending Requests
              </TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "invites" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("invites")}
            >
              <TextPrimary
                size={11}
                style={[tab === "invites" ? { color: "#fff" } : {}]}
              >
                Invites
              </TextPrimary>
            </Pressable>
          </View>
        </View>
        {tab === "membership" && <MembershipListing navigation={navigation} />}

        {tab === "request" && <MembershipPendingRequest />}
        {tab === "invites" && <MembershipInvites />}
      </View>
    </PageContainer>
  );
};

export default OrgMembershipList;

const styles = StyleSheet.create({});
