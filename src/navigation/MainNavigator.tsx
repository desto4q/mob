import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/onboarding/Onboarding";
import SignIn from "../screens/auth/SignIn";
import ResetPassword from "../screens/auth/ResetPassword";
import Otp from "../screens/auth/Otp";
import SelectAcctType from "../screens/auth/SelectAcctType";
import SignUpIndividual from "../screens/auth/SignUpIndividual";
import SignUpOrganization from "../screens/auth/SignUpOrganization";
import Home from "../screens/home/Home";
import UserTab from "./BottomTab";
import DrawerNav from "./DrawerNav";
import IdCardManagement from "../screens/IdCard/IdCardManagement";
import AddCard from "../screens/IdCard/AddCard";
import ViewCards from "../screens/IdCard/ViewCards";
import ViewCardDetails from "../screens/IdCard/ViewCardDetails";
import Membership from "../screens/membership/Membership";
import ViewMemberships from "../screens/membership/ViewMemberships";
import MembershipDetails from "../screens/membership/MembershipDetails";
import JoinOrganization from "../screens/membership/JoinOrganization";
import OrganizationDetails from "../screens/membership/OrganizationDetails";
import RequestSuccess from "../screens/membership/RequestSuccess";
import AddSubscriptions from "../screens/subscribtion/AddSubscriptions";
import ViewSubscriptions from "../screens/subscribtion/ViewSubscriptions";
import AddSubscriptionDetails from "../screens/subscribtion/AddSubscriptionDetails";
import Checkout from "../screens/subscribtion/Checkout";
import PendingRequest from "../screens/subscribtion/PendingRequest";
import VerificationOverview from "../screens/verify/VerificationOverview";
import VerificationRequest from "../screens/verify/VerificationRequest";
import VerifyOriganizationDetails from "../screens/verify/VerifyOrganizationDetails";
import AllVerifiers from "../screens/verify/AllVerifiers";
import ViewVerificationRequest from "../screens/verify/ViewVerificationRequest";
import ViewEventVerifiers from "../screens/verify/ViewEventVerifiers";
import EventDetails from "../screens/events/EventDetails";
import { useAppSelector } from "../state/hooks";
import SignUpOrganization2 from "../screens/auth/SignUpOrganization2";
import ChangePassword from "../screens/auth/ChangePassword";
import ResendEmail from "../screens/auth/ResendEmail";
import EventOverview from "../screens/events/EventOverview";
import CreateEvent from "../screens/events/CreateEvent";
import UpcomingEvent from "../screens/events/UpcomingEvent";
import TicketDetails from "../screens/events/TicketDetails";
import EventGallery from "../screens/events/EventGallery";
import Invite from "../screens/events/Invite";
import BuyTicket from "../screens/events/BuyTicket";
import EventInvites from "../screens/events/EventInvites";
import EventHistory from "../screens/events/EventHistory";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../config/url";
import { RootState } from "../state";
import { setLogout } from "../state/features/slices/userSlice";
import tw from "../lib/tailwind";
import VerifiersEventDetails from "../screens/verify/VerifiersEventDetails";
import OrgMembersList from "../screens/IdCard/OrgMembersList";
import CreateCardOrg from "../screens/IdCard/CreateCardOrg";
import ManageIdCard from "../screens/IdCard/ManageIdCard";
import IdPreview from "../screens/IdCard/IdPreview";
import OrgMembershipList from "../screens/membership/OrgMembershipList";
import MemberPreview from "../screens/membership/MemberPreview";
import OrgSubscription from "../screens/membership/OrgSubscription";
import AddSubscriptionPlan from "../screens/subscribtion/AddSubscriptionPlan";
import SubscriptionLogs from "../screens/subscribtion/SubscriptionLogs";
import EventStack from "./EventStack";
import CreateEvent2 from "../screens/events/CreateEvent2";
import CreateEvent3 from "../screens/events/CreateEvent3";
import UploadDocument from "../screens/profile/UploadDocument";
import AllEvents from "../screens/events/AllEvents";
import ScanTicket from "../screens/scan/ScanTicket";
import CardCategories from "../screens/IdCard/CardCategories";
import IndividualPendingReview from "../screens/membership/IndividualPendingPreview";
import InviteNewMember from "../screens/membership/InviteNewMember";
import UploadDocumentInd from "../screens/profile/UploadDocumentInd";
import CreateIdCardCategory from "../screens/IdCard/CreateIdCard";
import UploadImageScreen from "../screens/auth/UploadImageScreen";
import UploadLogoScreen from "../screens/auth/UploadLogoScreen";
import AddVerifiersScreen from "../screens/verify/AddVerifiersScreen";
import AddVerifiersBasicScreen from "../screens/verify/AddVerifiersBasicScreen";
import { useToggleMode } from "../utils/helpers";
import ManageVerifiers from "../screens/verify/ManageVerifiers";
import EventDetailsPublic from "../screens/events/EventDetailsPublic";
import ViewPersonalCards from "../screens/IdCard/ViewPersonalCards";
import ViewPersonalCardDetails from "../screens/IdCard/ViewPersonalCardDetails";
import VerificationRequestIndividual from "../screens/verify/VerificationRequestIndividual";
import PassTicketScreen from "../screens/events/PassTicketScreen";
import IndGeneralSubscription from "../screens/membership/IndGeneralSubscription";
import NotificationListing from "../screens/notification/NotificationListing";
import NotificationDetails from "../screens/notification/NotificationDetails";
import GeneralSubscriptionDetails from "../screens/membership/GeneralSubscriptionDetails";
import IndGeneralSubscriptionDetails from "../screens/membership/IndGeneralSubscriptionDetails";
import OrgBlacklistedMembers from "../screens/membership/OrgBlacklistedMembers";
import EditMember from "../screens/membership/EditMember";
import PreviewCard from "../screens/IdCard/PreviewCard";
import SubscribeToOrganization from "../screens/subscribtion/SubcribeToOrganization";
import SubscribeDetails from "../screens/subscribtion/SubscribeDetails";
import AllSubsctiptions from "../screens/subscribtion/AllSubscriptions";
import SubAccounts from "../screens/profile/SubAccounts";
import ViewDesignations from "../screens/subscribtion/ViewDesignations";
import GeneralSubscription from "../screens/membership/GeneralSubscription";

const Stack = createNativeStackNavigator();

const MainNavigator = ({ navigation }: any) => {
  const { isLoggedIn, role } = useAppSelector((state) => state.user);
  const [isVerifying, setIsVerifying] = useState(true);
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { mode, toggleColorMode } = useToggleMode();

  return (
    <>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="OnBoarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SelectAcctType"
              component={SelectAcctType}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResendEmail"
              component={ResendEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpIndividual"
              component={SignUpIndividual}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpOrganization"
              component={SignUpOrganization}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpOrganization2"
              component={SignUpOrganization2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadImageScreen"
              component={UploadImageScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadLogoScreen"
              component={UploadLogoScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={DrawerNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditMember"
              component={EditMember}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
            name="DrawerNav"
            component={DrawerNav}
            options={{ headerShown: false }}
          /> */}
            <Stack.Screen
              name="IdManagement"
              component={IdCardManagement}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddCard"
              component={AddCard}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ViewCards"
              component={ViewCards}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewPersonalCards"
              component={ViewPersonalCards}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ViewPersonalCardDetails"
              component={ViewPersonalCardDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewCardDetails"
              component={ViewCardDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Membership"
              component={Membership}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ViewMemberships"
              component={ViewMemberships}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MembershipDetails"
              component={MembershipDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="JoinOrganization"
              component={JoinOrganization}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrganizationDetails"
              component={OrganizationDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RequestSuccess"
              component={RequestSuccess}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ViewSubscriptions"
              component={ViewSubscriptions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddSubscriptions"
              component={AddSubscriptions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddSubscriptionDetails"
              component={AddSubscriptionDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="PendingRequest"
              component={PendingRequest}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="VerificationOverview"
              component={VerificationOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerificationRequest"
              component={VerificationRequest}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerificationRequestIndividual"
              component={VerificationRequestIndividual}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyOriganizationDetails"
              component={VerifyOriganizationDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllVerifiers"
              component={AllVerifiers}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewVerificationRequest"
              component={ViewVerificationRequest}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewEventVerifiers"
              component={ViewEventVerifiers}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventDetails"
              component={EventDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventDetailsPublic"
              component={EventDetailsPublic}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventStack"
              component={EventStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateEvent"
              component={CreateEvent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateEvent2"
              component={CreateEvent2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateEvent3"
              component={CreateEvent3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UpcomingEvent"
              component={UpcomingEvent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TicketDetails"
              component={TicketDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventGallery"
              component={EventGallery}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Invite"
              component={Invite}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BuyTicket"
              component={BuyTicket}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventInvites"
              component={EventInvites}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="EventHistory"
              component={EventHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifiersEventDetails"
              component={VerifiersEventDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrgMembersList"
              component={OrgMembersList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrgBlacklistedMembers"
              component={OrgBlacklistedMembers}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateCardOrg"
              component={CreateCardOrg}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageIdCard"
              component={ManageIdCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IdPreview"
              component={IdPreview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrgMembershipList"
              component={OrgMembershipList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SubscribeOrganization"
              component={SubscribeToOrganization}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MemberPreview"
              component={MemberPreview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrgSubscription"
              component={OrgSubscription}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewDesignations"
              component={ViewDesignations}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GeneralSubscriptionDetails"
              component={GeneralSubscriptionDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IndGeneralSubscriptionDetails"
              component={IndGeneralSubscriptionDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IndGeneralSubscription"
              component={IndGeneralSubscription}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GeneralSubscription"
              component={GeneralSubscription}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationListing"
              component={NotificationListing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationDetails"
              component={NotificationDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SubscribeDetails"
              component={SubscribeDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllSubscriptions"
              component={AllSubsctiptions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddSubscriptionPlan"
              component={AddSubscriptionPlan}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SubscriptionLogs"
              component={SubscriptionLogs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadDocument"
              component={UploadDocument}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadDocumentInd"
              component={UploadDocumentInd}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AllEvents"
              component={AllEvents}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddVerifiersScreen"
              component={AddVerifiersScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PreviewCard"
              component={PreviewCard}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="SavedAccounts"
              component={SubAccounts}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="AddVerifiersBasicScreen"
              component={AddVerifiersBasicScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageVerifiers"
              component={ManageVerifiers}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ScanTicket"
              component={ScanTicket}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PassTicketScreen"
              component={PassTicketScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CardCategories"
              component={CardCategories}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateIdCardCategory"
              component={CreateIdCardCategory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IndividualPendingReview"
              component={IndividualPendingReview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InviteNewMember"
              component={InviteNewMember}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;

// {isVerifying ? (
//   <View style={tw`flex-1 items-center bg-black justify-center`}>
//     <Image
//       style={{ width: 150 }}
//       resizeMode="contain"
//       source={require("../../assets/icon.png")}
//     />
//   </View>
// ) : (
