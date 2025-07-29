import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGetUserQuery } from "../state/features/services/users/user";
import WalletBalance from "../screens/wallet/WalletBalance";

const Stack = createNativeStackNavigator();

const WalletStack = () => {

  const { data } = useGetUserQuery();
  const { accountType } = data?.data as any || {};

  console.log(accountType)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WalletBalance"
        component={WalletBalance}
        options={{ headerShown: false }}
      />
     
    </Stack.Navigator>
  );
};

export default WalletStack;
