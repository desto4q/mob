import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import IdCardManagement from "../screens/IdCard/IdCardManagement";
import AddCard from "../screens/IdCard/AddCard";
import OrganizationHome from "../screens/home/OrganizationHome";
import { useSelector } from "react-redux";
import { RootState } from "../state";
import { useGetUserQuery } from "../state/features/services/users/user";
import EventOverview from "../screens/events/EventOverview";

const Stack = createNativeStackNavigator();

const EventStack = () => {

  const { data } = useGetUserQuery();
  const { accountType } = data?.data as any || {};

  console.log(accountType)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventOverview"
        component={EventOverview}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="IdManagement"
        component={IdCardManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default EventStack;
