import { StyleSheet, Text, View } from "react-native";
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

const IdCardManagement = ({ navigation }: any) => {
  const { data } = useGetUserQuery();

  const { accountType } = (data?.data as any) || {};

  const insets = useSafeAreaInsets();
  return (
    <PageContainer>
      <View style={tw`flex-row items-center gap-4`}>
        <ShadowGradient onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
        </ShadowGradient>
        <Header font="semi_bold">ID Card Management</Header>
      </View>

      {accountType === "Individual" && (
        <View style={tw`flex-1 gap-10 mt-16`}>
          <CardAction
            icon={icons.add_card}
            title="Add Card"
            text=" Go digital, create a digital version of your physical ID cards"
            sideIcon={images.green_side}
            onPress={() => navigation.navigate("AddCard")}
          />

          <CardAction
            icon={icons.double_card}
            title="Personal Cards"
            text=" See your personal cards"
            sideIcon={images.yellow_side}
            onPress={() => navigation.navigate("ViewPersonalCards")}
          />
          <CardAction
            icon={icons.double_card}
            title="My Cards"
            text=" See your cards from all your organisations"
            sideIcon={images.yellow_side}
            onPress={() => navigation.navigate("ViewCards")}
          />
        </View>
      )}

      {accountType === "Organization" && (
        <View style={tw`flex-1 gap-6 mt-16`}>
          <CardAction
            icon={icons.create_category}
            title="Create & Manage Card Category"
            text="Handle ID Card template creation for your organization members"
            sideIcon={images.green_side}
            onPress={() => navigation.navigate("CardCategories")}
          />

          <CardAction
            icon={icons.create_card}
            title="Create ID Card"
            text="Create ID cards for new members of your organization "
            sideIcon={images.subscription_right}
            onPress={() => navigation.navigate("OrgMembersList")}
          />

          <CardAction
            icon={icons.manage_card}
            title="Manage ID Cards"
            text="View all members with the organization ID card"
            sideIcon={images.blue_right}
            onPress={() => navigation.navigate("ManageIdCard")}
          />
        </View>
      )}
    </PageContainer>
  );
};

export default IdCardManagement;

const styles = StyleSheet.create({});
