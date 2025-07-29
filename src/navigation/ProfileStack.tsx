import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileOverview from "../screens/profile/ProfileOverview";
import PersonalData from "../screens/profile/PersonalData";
import AccountInfo from "../screens/profile/AccountInfo";
import Security from "../screens/profile/Security";
import Support from "../screens/profile/Support";
import { useGetUserQuery } from "../state/features/services/users/user";
import OrgProfileOverview from "../screens/profile/OrgProfileOverview";
import OrganizationData from "../screens/profile/OrganizationData";
import CreateIndSubAccount from "../screens/profile/CreateIndSubAccount";
import CreateOrgSubAccount from "../screens/profile/CreateOrgSubAccount";
import ContactUsScreen from "../screens/profile/ContactUsScreen";
import FaqScreen from "../screens/profile/FaqScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {

  const { data } = useGetUserQuery();
  const { accountType } = data?.data as any || {};

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={accountType === "Individual" ? ProfileOverview : OrgProfileOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalData"
        component={PersonalData}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="OrganizationData"
        component={OrganizationData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Security"
        component={Security}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="CreateIndSubAccount"
        component={CreateIndSubAccount}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="CreateOrgSubAccount"
        component={CreateOrgSubAccount}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Support"
        component={Support}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default ProfileStack;
