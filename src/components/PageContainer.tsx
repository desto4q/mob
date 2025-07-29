import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { colors } from "../utils/constants/colors";
import { useColorScheme } from "nativewind";
import tw from "../lib/tailwind";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IPageContainer {
  children: React.ReactNode;
  padding?: string | number;
  style?: any;
}

const PageContainer: FC<IPageContainer> = ({
  children,
  padding = "5%",
  style,
  ...props
}) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View
      style={[
        tw`bg-[#fff] dark:bg-[${colors.dark}]`,
        {
          flex: 1,
          paddingHorizontal: padding,
        },
        style,
      ]}
      {...props}
    >
      <SafeAreaView style={tw`flex-1 pt-2`}>{children}</SafeAreaView>
    </View>
  );
};

export default PageContainer;

const styles = StyleSheet.create({});
