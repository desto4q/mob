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

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import BottomModals from "../../components/modals/BottomModals";
import TextPrimary from "../../components/texts/text";
import Checkbox from "../../components/inputs/Checkbox";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import CardListing from "../../components/CardListing";
import { useColorScheme } from "nativewind";
import MemberItem from "../../components/MemberItem";
import images from "../../utils/constants/images";
import VerifiersItem from "../../components/verifcation/VerifiersEventItem";
import TabSelect from "../../components/TabSelect";
import BackButton from "../../components/BackButton";
import VerificationRequestItem from "../../components/verifcation/VerificationRequestItem";
import { useGetOrganizationVerificationRequestQuery } from "../../state/features/services/verification/verification";
import tw from "../../lib/tailwind";
import PendingVerificationList from "../../components/verifcation/PendingVerificationList";
import ReceivedVerificationList from "../../components/verifcation/ReceivedVerificationList";
import ReceivedVerificationListIndividual from "../../components/verifcation/ReceivedVerificationListIndividual";
import PendingVerificationListIndividual from "../../components/verifcation/PendingVerificationListIndividual";

const VerificationRequestIndividual = ({ navigation }: any) => {
  const [tab, setTab] = useState<"received" | "initiated">("received");

  return (
    <>
      <PageContainer padding="0%">
        <View style={tw` flex-row justify-between px-[5%]`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Verification Request
          </Header>
          {/* <AntDesign
                name="pluscircle"
                size={24}
                color={colors.primary}
                onPress={() => navigation.navigate("JoinOrganization")}
              /> */}
          <View />
        </View>
        <View style={tw`my-5 gap-4 mt-0 px-[5%]`}>
          <TextPrimary
            size={13}
            font="medium"
            color={colors.gray_light}
            style={tw`mt-5`}
          >
            All your pending verification request
          </TextPrimary>
        </View>
        <View style={tw`mb-1 px-[5%]`}>
          <View
            style={[
              tw`px-[8px] py-[5px] flex-row rounded-[20px]  dark:bg-gray_dark bg-light`,
            ]}
          >
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "received" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("received")}
            >
              <TextPrimary
                size={11}
                style={[tab === "received" ? { color: "#fff" } : {}]}
              >
                Received
              </TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "initiated" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("initiated")}
            >
              <TextPrimary
                size={11}
                style={[tab === "initiated" ? { color: "#fff" } : {}]}
              >
                Initiated
              </TextPrimary>
            </Pressable>
          </View>
        </View>
        {tab === "received" && <ReceivedVerificationListIndividual />}
        {tab === "initiated" && <PendingVerificationListIndividual />}
      </PageContainer>
    </>
  );
};

export default VerificationRequestIndividual;

const styles = StyleSheet.create({});
