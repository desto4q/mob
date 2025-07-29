import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useToggleMode } from "../utils/helpers";
import { navigationRef } from "./navigationRef";

const AppNavigator = () => {
  const mode = useSelector((state: RootState) => state.user.mode);
  const { mode: color } = useToggleMode();
  // console.warn("from sore", mode)
  // console.warn("from mode", color)
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
