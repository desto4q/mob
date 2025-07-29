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
import VerificationAction from "../../components/verifcation/VerificationAction";
import { useGetUserQuery } from "../../state/features/services/users/user";

const VerificationOverview = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { data } = useGetUserQuery();
  const { accountType } = (data?.data as any) || {};
  return (
    <PageContainer>
      <View style={tw`flex-row items-center justify-between gap-4`}>
        <ShadowGradient onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
        </ShadowGradient>
        <Header font="semi_bold">Verification</Header>
        <View />
      </View>
      {accountType === "Organization" && (
        <View style={tw`gap-5 mt-16`}>
          <VerificationAction
            title="Add Verifiers"
            text="Add verifiers to your upcoming event"
            image={images.add_verifiers}
            onPress={() => navigation.navigate("AddVerifiersBasicScreen")}
          />
          <VerificationAction
            title="Manage Verifiers"
            text="See all verifiers assigned to events"
            image={images.all_verification}
            onPress={() => navigation.navigate("AllVerifiers")}
          />
          <VerificationAction
            title="Verification Request"
            text="All your verification requests"
            image={images.verification}
            onPress={() => navigation.navigate("VerificationRequest")}
          />

          <VerificationAction
            title="Scan Event"
            text="See events you are appointed as verifier"
            image={images.scan_event}
            onPress={() => navigation.navigate("ScanTicket")}
          />
          {/* <VerificationAction
            title="View Event Verifiers"
            text="4 Verifiers"
            image={images.verification}
            onPress={() => navigation.navigate("ViewEventVerifiers")}
          /> */}
        </View>
      )}
      {accountType === "Individual" && (
        <View style={tw`gap-6 mt-16`}>
          <VerificationAction
            title="Manage Verifiers"
            text="See all verifiers assigned to events"
            image={images.all_verification}
            onPress={() => navigation.navigate("ManageVerifiers")}
          />
          <VerificationAction
            title="Verification Request"
            text="All your verification requests"
            image={images.verification}
            onPress={() => navigation.navigate("VerificationRequestIndividual")}
          />

          <VerificationAction
            title="Scan Event"
            text="See events you are appointed as verifier"
            image={images.scan_event2}
            onPress={() => navigation.navigate("ScanTicket")}
          />
          {/* <VerificationAction
            title="View Event Verifiers"
            text="4 Verifiers"
            image={images.verification}
            onPress={() => navigation.navigate("ViewEventVerifiers")}
          /> */}
        </View>
      )}
    </PageContainer>
  );
};

export default VerificationOverview;

const styles = StyleSheet.create({});
